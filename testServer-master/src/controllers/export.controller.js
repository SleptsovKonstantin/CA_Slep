/* eslint-disable camelcase */
const writeXlsxFile = require('write-excel-file/node');
const response = require('../helpers/response');
const {
  LEFT_SUMMARY_INDEXES, CANDIDATE_STATUSES_INDEXED_id, APPLICATION_POSITIONS_INDEXES, POSITIONS_INDEXES,
} = require('../constants/candidate');
const { getParams } = require('../helpers/common');
const {
  WorkGroup,
  Candidate,
  Channel,
  Employee,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');

function declOfNum(number, words) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}


const getWorkPeriod = (values) => {
  if (!values.startWorkDate) {
    return ' - ';
  }
  const now = values.leftDate ? new Date(values.leftDate) : new Date();
  const start = new Date(values.startWorkDate);
  const nowMs = now.getTime();
  const startMs = start.getTime();
  const diff = new Date(nowMs > startMs ? nowMs - startMs : startMs - nowMs);
  const yearsDiff = diff.getFullYear() - 1970;
  const monthDiff = diff.getMonth();
  const daysDiff = diff.getDate();
  let result = nowMs < startMs ? '-' : '';
  const diffMs = new Date().getTime() - startMs;
  if (diffMs < 0) {
    return ' --- ';
  }

  if (yearsDiff) {
    result += `${yearsDiff} ${declOfNum(yearsDiff, ['год', 'года', 'лет'])} `;
  }
  if (monthDiff) {
    result += `${monthDiff} ${declOfNum(monthDiff, ['месяц', 'месяца', 'месяцев'])} `;
  }
  if (['', '-'].includes(result) && daysDiff) {
    result += `${daysDiff} ${declOfNum(daysDiff, ['день', 'дня', 'дней'])} `;
  }
  return result;
};

const getCommentPub = (val) => {
  if (typeof val === 'string') {
    return val;
  }

  if (Array.isArray(val)) {
    return val[0]?.message || '';
  }
  return '';
};

const fieldsFormattersEmployee = {
  ФИО: (i) => i.fio,
  Рекрутер: (i) => i.mainRecruiterName || i.createdBy || 'Н/Д',
  'Рабочая группа': (i, workGroupIndexes) => workGroupIndexes[i.workGroup] || 'Н/Д',
  Позиция: (i) => POSITIONS_INDEXES[i.position] || 'Н/Д',
  Статус: (i) => CANDIDATE_STATUSES_INDEXED_id[i.status] || i.status,
  'Причина увольния': (i) => LEFT_SUMMARY_INDEXES[i.leftSummary] || 'Н/Д',
  Стаж: (i) => getWorkPeriod(i),
  Уволен: (i) => (!i.leftDate ? 'Не уволен' : new Date(i.leftDate).toDateString()),
  'Нач. Обучения': (i) => (i.trainingDate && new Date(i.trainingDate).toDateString()) || 'Н/Д',
  'Нач. Стажировки': (i) => (i.internDate && new Date(i.internDate).toDateString()) || 'Н/Д',
  'Дата Рождения': (i) => new Date(i.birthDate).toDateString() || 'Н/Д',
  Комментарии: (i) => getCommentPub(i.comment),
};

const fieldsFormattersCandidate = {
  ФИО: (i) => i.fio,
  Рекрутер: (i) => i.mainRecruiterName || i.createdBy || 'Н/Д',
  Канал: (i, a, cahnnelsIndexed) => cahnnelsIndexed[i.channel] || 'Н/Д',
  'Слышал о компании': (i) => i.heared_about_company || 'Н/Д',
  Возраст: (i) => i.age || 'Н/Д',
  Статус: (i) => CANDIDATE_STATUSES_INDEXED_id[i.result] || i.result,
  VK: (i) => i.vk || 'Н/Д',
  HH: (i) => i.hh || 'Н/Д',
  Анкета: (i) => i.worksheet || 'Н/Д',
  'Рабочая группа': (i, workGroupIndexes) => workGroupIndexes[i.workGroup] || 'Н/Д',
  Заявка: (i, workGroupsIndexes) => {
    if (!i.applicationItem) {
      return 'N/A';
    }
    const { position, workGroup } = i.applicationItem;
    return `${APPLICATION_POSITIONS_INDEXES[position]}  ${(workGroupsIndexes && workGroupsIndexes[workGroup]?.name) || 'N/A'}`;
  },
  Позиция: (i) => POSITIONS_INDEXES[i.position] || 'Н/Д',
  Телефон: (i) => i.phone || 'Н/Д',
  Email: (i) => i.email || 'Н/Д',
  'Дата Контакта': (i) => new Date(i.lastContactDate).toDateString() || 'Н/Д',
  'Дата Собеса': (i) => new Date(i.interviewDate).toDateString() || 'Н/Д',
  Англ: (i) => i.english || 'Н/Д',
  Тех: (i) => i.tech || 'Н/Д',
  Комментарии: (i) => i.comment || 'Н/Д',
};

const formatCandidateInfo = (item, keys, workGroupIndexes, cahnnelsIndexed) => {
  const result = [];

  keys.forEach((key) => {
    result.push({
      value: `${fieldsFormattersCandidate[key](item, workGroupIndexes, cahnnelsIndexed) || ''}`,
    });
  });

  return result;
};

const formatEmployeeInfo = (item, keys, workGroupIndexes, cahnnelsIndexed) => {
  const result = [];

  keys.forEach((key) => {
    result.push({
      value: `${fieldsFormattersEmployee[key](item, workGroupIndexes, cahnnelsIndexed) || ''}`,
    });
  });

  return result;
};

/**
 * {GET} /export/candidates.xlsx
 * @returns {Promise<void>}
 */
const exportCandidatesToXlsx = async (req, res) => {
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
    const candidates = await Candidate.getCandidates(query, { ...params, limit: 1000000, skip: 0 });
    const workGroups = await WorkGroup.find({});
    const workGroupIndexed = workGroups.reduce((acc, i) => { acc[i._id] = i.name; return acc; }, {});
    const cahnnels = await Channel.find(query);
    const cahnnelsIndexed = cahnnels.reduce((acc, i) => { acc[i.id] = i.name; return acc; }, {});
    const keys = Object.keys(fieldsFormattersCandidate);
    const formatted = candidates.items.map((i) => formatCandidateInfo(i, keys, workGroupIndexed, cahnnelsIndexed));
    const header = keys.map((i) => ({ value: i, fontWeight: 'bold' }));

    const columns = [
      { width: 30 }, // fio
      { width: 20 }, // recruiter
      { width: 8 }, // channel
      { width: 10 }, // heared
      { width: 7 }, // age
      { width: 15 }, // status
      { width: 25 }, // vk
      { width: 25 }, // hr
      { width: 10 }, // anketa
      { width: 30 }, // workgroup
      { width: 15 }, // application
      { width: 10 }, // position
      { width: 20 }, // phone
      { width: 20 }, // email
      { width: 20 }, // date cont
      { width: 20 }, // date inte
      { width: 10 }, // angl
      { width: 10 }, // tech
      { width: 150 }, // comment
    ];


    const stream = await writeXlsxFile([header, ...formatted], {
      // filePath: `${__dirname}/../../candidates.xlsx`,
      stickyRowsCount: 1,
      columns,
    });
    stream.pipe(res);
    // res.sendFile()
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * {GET} /export/employees.xlsx
 * @returns {Promise<void>}
 */
const exportEmployeesToXlsx = async (req, res) => {
  const params = getParams(req);
  try {
    let query = {
      deleted: { $ne: true },
    };
    if (params.search) {
      // eslint-disable-next-line no-useless-escape
      let text = params.search.split(' ')
        .map((i) => i.trim()
          // eslint-disable-next-line
          .replace(/([^а-яА-Я0-9a-zA-Z-_\/:\.])+/gui, ''))
        .join('|');
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
    // if (!params.search && !req.user.isFull) {
    //   let ids = await Interview.find({ updatedBy: req.user._id }).select('candidate').lean();
    //   ids = ids.map((i) => i.candidate);
    //   query._id = { $in: ids };
    // }

    if (params.result) {
      query.result = params.result;
    }
    if (params.status) {
      query.status = params.status;
    }

    if (params.leftReason) {
      query.leftReason = params.leftReason;
    }
    if (params.team) {
      query.team = params.team;
    }
    if (params.teams) {
      query.team = { $in: params.teams };
    }
    if (params.workGroup) {
      query.workGroup = params.workGroup;
    }
    if (params.position) {
      query.position = params.position;
    }
    if (params.positions) {
      query.position = { $in: params.positions.map((i) => decodeURI(i)) };
    }
    if (params.onlyMy === 'true') {
      query.updatedBy = req.user._id;
    }
    if (params.onlyPlan === 'true') {
      query.$or = [{ inPlan: true }, {
        position: { $in: ['qa', 'developer', 'team_lead', 'intern'] },
        // startWorkDate: { $ne: null },
      }];
    }
    if (params.city) {
      query.city = params.city;
    }

    if (params.inLLC_RU) {
      query.inLLC_RU = params.inLLC_RU;
    }

    if (params.dismissed === 'true') {
      query.leftDate = { $ne: null };
      params.sortBy = '-leftDate';
    } else if (!params.search) {
      const newQuery = {};
      newQuery.$and = [query, { $or: [{ leftDate: null }, { leftDate: { $exists: false } }] }];
      query = newQuery;
    }

    if (params.employeeId) {
      query = { _id: params.employeeId };
    }
    // TODO search only not completed candidates for authorized hr
    const candidates = await Employee.getEmployees(query, { ...params, limit: 1000000, skip: 0 });
    const workGroups = await WorkGroup.find({});
    const workGroupIndexed = workGroups.reduce((acc, i) => { acc[i._id] = i.name; return acc; }, {});
    const cahnnels = await Channel.find(query);
    const cahnnelsIndexed = cahnnels.reduce((acc, i) => { acc[i.id] = i.name; return acc; }, {});
    const keys = Object.keys(fieldsFormattersEmployee);
    const formatted = candidates.items.map((i) => formatEmployeeInfo(i, keys, workGroupIndexed, cahnnelsIndexed));
    const header = keys.map((i) => ({ value: i, fontWeight: 'bold' }));

    const columns = [
      { width: 30 }, // fio
      { width: 20 }, // recruiter
      { width: 8 }, // channel
      { width: 10 }, // heared
      { width: 7 }, // age
      { width: 15 }, // status
      { width: 25 }, // vk
      { width: 25 }, // hr
      { width: 10 }, // anketa
      { width: 30 }, // workgroup
      { width: 15 }, // application
      { width: 10 }, // position
      { width: 20 }, // phone
      { width: 20 }, // email
      { width: 20 }, // date cont
      { width: 20 }, // date inte
      { width: 20 }, // birth date
      { width: 10 }, // angl
      { width: 10 }, // tech
      { width: 150 }, // comment
    ];


    const stream = await writeXlsxFile([header, ...formatted], {
      // filePath: `${__dirname}/../../candidates.xlsx`,
      stickyRowsCount: 1,
      columns,
    });
    stream.pipe(res);
    // res.sendFile()
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

module.exports = {
  exportCandidatesToXlsx,
  exportEmployeesToXlsx,

};
