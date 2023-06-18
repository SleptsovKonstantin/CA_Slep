const fs = require('fs');
const response = require('../helpers/response');
const { CANDIDATE_STATUSES_INDEXED } = require('../constants/candidate');
const { addFieldsHistory } = require('../helpers/logs');
const { formatVkLink } = require('../helpers/common');
const { getParams } = require('../helpers/common');
const {
  parseCandidateArchive,
  parseTaganrogCandidateArchive,
} = require('../modules/ImportArchive');
const {
  Candidate,
  Employee,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');


const checkIfCandidateExists = async (params) => {
  const fioSplit = (params.fio && params.fio.length ? params.fio : '').split(' ');
  const query = {
    $or: [],
  };

  if (params.fio) {
    query.$or = [
      {
        fio: params.fio && params.fio.trim(),
      },
      {
        fio: new RegExp([fioSplit[0], fioSplit[1]].join(' '), 'gi'),
      },
      {
        fio: new RegExp([fioSplit[1], fioSplit[0]].join(' '), 'gi'),
      },
    ];
  }

  if (params.hh) {
    query.$or.push({
      hh: params.hh,
    });
  }
  if (params.vk) {
    query.$or.push({
      vk: params.vk,
    });
  }
  if (params.phone) {
    query.$or.push({
      phone: params.phone,
    });
  }
  if (params.email) {
    query.$or.push({
      email: params.email,
    });
  }
  if (params._id) {
    query._id = { $ne: params._id };
  }

  if (!query.$or.length) {
    return false;
  }
  const candidates = await Candidate.find(query);
  return candidates.length ? candidates : false;
};

const syncCandidateWithEmployee = async (forSave, candidate) => {
  const query = { _id: candidate.employee };
  const newEmployeeFields = {};

  const neededKeys = ['workGroup', 'team', 'phone', 'position', 'result', 'fio', 'vk', 'hh', 'email', 'application'];

  neededKeys.forEach((key) => {
    if (key === 'result' && forSave[key] < 10) {
      return;
    }

    if (key in forSave) {
      if (key === 'result') {
        newEmployeeFields.status = forSave[key];
      }
      newEmployeeFields[key] = forSave[key];
    }
  });

  if (Object.keys(neededKeys).length) {
    await Employee.updateOne(query, { $set: newEmployeeFields });
  }
};

/**
 * [GET] /interview/candidate
 */
const getCandidates = async (req, res) => {
  const params = getParams(req);
  try {
    const query = {};
    if (params.search) {
      // eslint-disable-next-line no-useless-escape
      let text = params.search.split(' ')
        .map((i) => i.trim()
        // eslint-disable-next-line
          .replace(/([^а-яА-Я0-9a-zA-Z-_\/:\.])+/gui, ''))
        .join('|');// eslint-disable-next-line
      text = text.replace(/(е|ё)/gui, '(е|ё)');

      const re = new RegExp(`(${text})`, 'giu');
      const reQuery = { $regex: re };
      query.$or = [
        { fio: reQuery },
        { email: reQuery },
        { phone: reQuery },
        { vk: reQuery },
      ];
    }

    if (params.result) {
      query.result = params.result;
    }

    if (params.leftReason) {
      query.leftReason = params.leftReason;
    }
    if (params.team) {
      query.team = params.team;
    }
    if (params.workGroup) {
      query.workGroup = params.workGroup;
    }
    if (params.position) {
      query.position = params.position;
    }
    if (params.onlyMy === 'true') {
      query.mainRecruiterId = req.user._id;
    }
    if (params.user) {
      query.mainRecruiterId = params.user;
    }
    if (params.heared_about_company === 'true') {
      query.heared_about_company = 'yes';
    }
    // TODO search only not completed candidates for authorized hr
    const candidates = await Candidate.getCandidates(query, params);

    response.success(res, candidates);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [GET] /interview/candidate/:id
 */
const getCandidate = async (req, res) => {
  const params = getParams(req);
  try {
    // TODO search only not completed candidates for authorized hr
    const candidate = await Candidate.findOne({ _id: params.id })
      .populate('interview');

    response.success(res, candidate);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 * [GET] /candidate/check/vk
 */
const checkVk = async (req, res) => {
  const params = getParams(req);
  try {
    const query = {};
    if (params.withId && params.withNick) {
      query.$or = [{ vk: params.withId }, { vk: params.withNick }];
    } else if (params.withId) {
      query.vk = params.withId;
    } else if (params.withNick) {
      query.vk = params.withNick;
    }

    // TODO search only not completed candidates for authorized hr
    const candidate = await Candidate.findOne(query);
    if (!candidate) {
      response.success(res, { notFound: true });
      return;
    }
    const result = {
      vk: candidate.vk,
      interviewDate: candidate.interviewDate,
      noWriteAgain: candidate.noWriteAgain,
      mayWriteAfter: candidate.mayWriteAfter,
      _id: candidate._id,
      fio: candidate.fio,
    };

    response.success(res, result);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


const createEmployeeByCandidate = async (params, req, candidate) => {
  const forSave = { ...params };
  forSave.vk = formatVkLink(forSave.vk);
  forSave.updatedBy = [req.user._id];
  forSave.candidate = candidate._id;
  forSave.fio = params.fio || candidate.fio;
  forSave.status = params.result;
  if (CANDIDATE_STATUSES_INDEXED['Сотрудник'] === params.result) { // / ??? ask if needed
    forSave.startWorkDate = new Date();
  }
  if (CANDIDATE_STATUSES_INDEXED['Обучение'] === params.result) {
    forSave.trainingDate = new Date();
  }
  if (CANDIDATE_STATUSES_INDEXED['Стажировка'] === params.result) {
    forSave.internDate = new Date();
  }
  delete forSave._id;
  const employee = await Employee.create(forSave);
  return employee;
};


/**
 * [POST] /interview/candidate
 */
const addCandidate = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  // TODO сделать ограничение что бы не добавлять одинаковых пользоателей
  const params = getParams(req);

  if (!params.status) {
    params.status = params.interviewDate ? 'created' : 'first_contact';
  }

  if (params.application === '') {
    params.application = undefined;
  }
  try {
    const interviewInfo = {
      status: params.status,
      position: params.position,
      source: params.source,
      team: params.team || req.user.team,
    };

    if (params.team) {
      interviewInfo.team = params.team;
    }
    if (params.mainRecruiterId !== req.user._id) {
      params.mainRecruiterId = req.user._id;
      params.mainRecruiterName = req.user.fullName;
    }

    params.updatedBy = [req.user._id];
    if (!params.candidateId) {
      const candidates = await checkIfCandidateExists(params);
      if (candidates && !params.force) {
        response.error(res, STATUS_CODE.CONFLICT, { candidates });
        return;
      }
    }

    params.vk = formatVkLink(params.vk);

    if (params.source === 'vk') {
      params.channel = 2;
      params.result = 1;
    }
    if (!params.candidateId) {
      params.createdBy = req.user.fullName;
      params.createdById = req.user._id;
    }

    // eslint-disable-next-line max-len
    let candidate = params.candidateId ? await Candidate.findOne({ _id: params.candidateId }) : new Candidate(params);
    if (!candidate) {
      throw Error('Кандидат не найден');
    }

    // результат собеса стажировку принял
    if (params.result === 4) {
      const employee = await createEmployeeByCandidate(params, req, candidate);
      candidate.employee = employee._id;
    }

    candidate = await candidate.save();
    response.success(res, candidate);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [PUT] /interview/candidate
 */
const updateCandidate = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  if (params.application === '') {
    params.application = undefined;
  }
  try {
    if (!params.force) {
      const candidates = await checkIfCandidateExists(params);
      if (candidates) {
        response.error(res, STATUS_CODE.CONFLICT, { candidates });
        return;
      }
    }

    let forSave = {
      ...params,
    };

    delete forSave.interview;
    delete forSave._id;
    delete forSave.updatedBy;

    forSave.vk = formatVkLink(forSave.vk);

    if (forSave.mainRecruiterId !== req.user._id) {
      forSave.mainRecruiterId = req.user._id;
      forSave.mainRecruiterName = req.user.fullName;
    }


    const candidate = await Candidate.findOne({ _id: params._id })
      .lean();
    // результат собеса стажировку принял
    if ([CANDIDATE_STATUSES_INDEXED['Обучение'], CANDIDATE_STATUSES_INDEXED['Стажировка'], CANDIDATE_STATUSES_INDEXED['Сотрудник']].includes(forSave.result) && candidate.result !== forSave.result && !candidate.employee) {
      const employee = await createEmployeeByCandidate(params, req, candidate);
      forSave.employee = employee._id;
    }

    forSave = addFieldsHistory(forSave, candidate, `${req.user._id}`);

    const updateInfo = await Candidate.updateOne({ _id: params._id },
      {
        $set: forSave,
        $addToSet: { updatedBy: `${req.user._id}` },
      });
    if (!updateInfo.n) {
      throw Error('Кандидат не был обновлен');
    }
    console.log('LOOOG', {
      ...forSave,
      updateLog: null,
    });
    if (candidate.employee) {
      await syncCandidateWithEmployee(forSave, candidate);
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [DELETE] /candidate/:id
 */
const deleteCandidate = async (req, res) => {
  const params = getParams(req);
  try {
    const updateInfo = await Candidate.deleteOne({ _id: params.id });
    if (!updateInfo.n) {
      throw Error('Кандидат не был найден');
    }
    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /candidate/import/archive
 */

const importCandidatesArchive = async (req, res) => {
  const params = getParams(req);
  const file = req.files.document;

  try {
    if (!file) {
      throw Error('File is required');
    }
    if (!params.workGroup) {
      throw Error('workGroup is required');
    }
    const candidates = await parseCandidateArchive(file.path, params.workGroup);
    await Candidate.insertMany(candidates);
    fs.unlink(file.path, () => {
      response.success(res, { created: candidates.length });
    });
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [POST] /candidate/import/archive/taganrog
 */

const importTaganrogCandidatesArchive = async (req, res) => {
  const file = req.files.document;

  try {
    if (!file) {
      throw Error('File is required');
    }
    const candidates = await parseTaganrogCandidateArchive(file.path);
    await Candidate.insertMany(candidates);
    fs.unlink(file.path, () => {
      response.success(res, { created: candidates.length });
    });
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


const updateCandidateField = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const forSave = {
      [params.field]: params.value,
    };

    delete forSave.interview;
    delete forSave._id;

    const updateInfo = await Candidate.update({ _id: params.itemId },
      { $set: forSave });
    if (!updateInfo.n) {
      throw Error('Кандидат не был обновлен');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG ', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

module.exports = {
  checkVk,
  importCandidatesArchive,
  updateCandidate,
  getCandidate,
  getCandidates,
  addCandidate,
  updateCandidateField,
  importTaganrogCandidatesArchive,
  deleteCandidate,
};
