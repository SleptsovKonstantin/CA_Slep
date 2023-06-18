const fs = require('fs');
const response = require('../helpers/response');
const { addFieldsHistory } = require('../helpers/logs');
const { formatVkLink } = require('../helpers/common');
const { getParams } = require('../helpers/common');
const { parseStaffArchive } = require('../modules/ImportArchive');
const {
  Employee,
  Candidate,
} = require('../models');
const { getPromise } = require('../modules/MasterConnector');
const { STATUS_CODE } = require('../../config/constants.json');

const syncEmployeeWithCandidate = async (forSave, employee) => {
  const query = { _id: employee.candidate };
  const newEmployeeFields = {};

  const neededKeys = ['workGroup', 'team', 'phone', 'position', 'status', 'fio', 'vk', 'hh', 'email', 'application'];

  neededKeys.forEach((key) => {
    if (key in forSave) {
      if (key === 'status') {
        newEmployeeFields.result = forSave[key];
      }
      newEmployeeFields[key] = forSave[key];
    }
  });

  if (Object.keys(neededKeys).length) {
    await Candidate.updateOne(query, { $set: newEmployeeFields });
  }
};

/**
 * [GET] /Staff
 */
const getStaff = async (req, res) => {
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
    // TODO HIDE SALARY FOR HR SYSTEM
    const candidates = await Employee.getEmployees(query, params);

    response.success(res, candidates);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 * [GET] /Staff
 */
const getEmployeeSalary = async (req, res) => {
  const params = getParams(req);
  const month = params.month || 0;

  const positionsMap = {
    intern: 'intern',
    intern_ed: 'intern',
    developer: 'dev',
    financier: 'finance',
    copywriter: 'copywriter',
    designer: 'other',
    team_lead: ['pm0', 'pm05', 'pm1'],
    qa: 'qa',
    marketer: 'marketer',
    english_teacher: 'other',
    ed_teacher: 'other',
    ho: 'other',
    ceo: 'other',
    cto: 'other',
    coo: 'other',
    recruiter: ['hr', 'other'],
    office_manager: ['hr', 'other'],
    kadrovik: ['hr', 'other', 'finance'],
    other: 'other',
    sales: 'sales',
    hr: 'hr',
    pm: ['pm0', 'pm05', 'pm1'],
    hd: ['pm0', 'pm05', 'pm1', 'other'],
    tech_lead: ['pm0', 'pm05', 'pm1', 'other'],
    mentor: ['pm0', 'pm05', 'pm1', 'other', 'dev'],
  };
  try {
    const query = {
      deleted: { $ne: true },
      leftDate: null,
    };

    // TODO search only not completed candidates for authorized hr
    const employees = await Employee.find(query)
      .lean();
    const groupedByTeam = employees.reduce((result, item) => {
      result[item.team] = result[item.team] || [];
      item.salary = 0;
      result[item.team].push(item);
      return result;
    }, {});

    const monthInfo = await getPromise(`/api/finance/stats?month=${month}`, req);
    if (!monthInfo.data) {
      response.error(res, STATUS_CODE.SERVER_ERROR, 'Отсутствуют данные о зп');
      return;
    }

    monthInfo.data.forEach((item) => {
      const staff = groupedByTeam[item.team];
      if (!staff) {
        return;
      }
      if (!(item.employees && item.employees.length)) {
        return;
      }

      const updatedStaff = staff.map((employeeHr) => {
        let salary = 0;
        let finPosition = '-';
        item.employees.forEach((employeeFin) => {
          const split = employeeFin.name.split(' ').filter((i) => /^!?([a-zA-Zфа-яА-Я])+$/.test(i.trim()));
          const re = new RegExp(`(${split.join('|')})`, 'gi');
          const match = employeeHr.fio.match(re) || '';
          const matchLength = employeeFin.name.length / employeeHr.fio.length;
          delete employeeHr.updateLog;
          if (match.length === split.length && matchLength > 0.33) {
            employeeHr.finName = employeeFin.name;
            salary = (employeeFin.period1 + employeeFin.period2
              + employeeFin.period1Bonus + employeeFin.period2Bonus).toFixed(1);
            finPosition = employeeFin.role;
          }
        });
        let isPositionMatched = true;
        const positionFromMap = positionsMap[employeeHr.position];
        if (!Array.isArray(positionFromMap)) {
          isPositionMatched = positionFromMap === finPosition;
        }

        if (Array.isArray(positionFromMap)) {
          let matched = false;
          positionFromMap.forEach((position) => {
            if (position === finPosition) {
              matched = true;
            }
          });
          isPositionMatched = matched;
        }
        return {
          ...employeeHr, salary, test: salary, finPosition, isPositionMatched,
        };
      });
      groupedByTeam[item.team] = updatedStaff;
    });

    response.success(res, groupedByTeam);
  } catch (e) {
    // TODO add logger to handle errors
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [GET] /staff/applications/possible
 */

const getStaffApplicationsPossible = async (req, res) => {
  const params = getParams(req);
  const queryEmployee = { application: params._id };
  const queryCandidates = {
    application: params._id,
  };


  try {
    const employees = await Employee.find(queryEmployee)
      .lean();
    const candidates = await Candidate.find(queryCandidates)
      .lean();
    response.success(res, {
      employees,
      candidates,
    });
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [GET] /interview/candidate/:id
 */
const getEmployee = async (req, res) => {
  const params = getParams(req);
  try {
    // TODO search only not completed candidates for authorized hr
    const query = {
      _id: params.id,
      deleted: { $ne: true },
    };

    const candidate = await Employee.findOne(query)
      .populate('interview');

    response.success(res, candidate);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /staff
 */
const addEmployee = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  // TODO сделать ограничение что бы не добавлять одинаковых пользоателей
  const params = getParams(req);
  if (params.application === '') {
    params.application = undefined;
  }
  if (!params.status) {
    params.status = params.interviewDate ? 'created' : 'first_contact';
  }
  try {
    params.updatedBy = [req.user._id];
    if (!params.hasProject) {
      delete params.hasProject;
    }

    if (params.mainRecruiterId !== req.user._id) {
      params.mainRecruiterId = req.user._id;
      params.mainRecruiterName = req.user.fullName;
    }

    if (!params.candidateId) {
      params.createdBy = req.user.fullName;
      params.createdById = req.user._id;
    }

    params.vk = formatVkLink(params.vk);
    // eslint-disable-next-line max-len
    let candidate = params.candidateId ? await Employee.findOne({ _id: params.candidateId }) : new Employee(params);
    if (!candidate) {
      throw Error('Сотрудник не найден');
    }

    candidate = await candidate.save();
    response.success(res, candidate);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [PUT] /staff
 */
const updateEmployee = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  if (params.application === '') {
    params.application = undefined;
  }
  try {
    let forSave = {
      ...params,
    };

    delete forSave.interview;
    delete forSave._id;
    delete forSave.updatedBy;
    delete forSave.updateLog;

    forSave.vk = formatVkLink(forSave.vk);

    if (forSave.mainRecruiterId !== req.user._id) {
      forSave.mainRecruiterId = req.user._id;
      forSave.mainRecruiterName = req.user.fullName;
    }

    if (!forSave.hasProject) {
      delete forSave.hasProject;
    }

    if (Array.isArray(forSave.comment)) {
      forSave.comment = forSave.comment.map((i) => {
        i.from = i.from || req.user.fullName;
        return i;
      });
    }

    const employee = await Employee.findOne({ _id: params._id });
    forSave = addFieldsHistory(forSave, employee, `${req.user._id}`);
    const saveParams = {
      $set: forSave,
      $addToSet: { updatedBy: `${req.user._id}` },
    };


    const updateInfo = await Employee.findOneAndUpdate({ _id: params._id }, saveParams,
      { new: true });

    if (employee.candidate) {
      await syncEmployeeWithCandidate(forSave, employee);
    }
    if (!updateInfo) {
      throw Error('Кандидат не был обновлен');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 *
 * [DELETE] /staff
 *
 */
const removeEmployee = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const removeQuery = {
      _id: params.id,
    };
    let forSave = { deleted: true };
    const employee = await Employee.findOne(removeQuery);
    forSave = addFieldsHistory(forSave, employee, `${req.user._id}`);
    const updateInfo = await Employee.updateOne(removeQuery, { $set: forSave });

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 *
 * [POST] /staff/salary
 *
 */
const updateSalary = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const toSaveItems = [];

    Object.keys(params.salary).forEach((key) => {
      const keys = {};
      Object.keys(params.salary[key]).forEach((period) => {
        keys[`salary.${period}`] = params.salary[key][period];
      });
      toSaveItems.push({ query: { _id: key }, set: { $set: keys } });
    });

    const updatePromises = [];

    toSaveItems.forEach((item) => {
      updatePromises.push(Employee.update(item.query, item.set));
    });

    const result = await Promise.all(updatePromises);

    response.success(res, result);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

const monthTwoChar = (month) => {
  const int = parseInt(month, 10);
  return int >= 10 ? int : `0${int}`;
};
/**
 *
 * [POST] /staff/salary/pull_prev
 *
 */
const pullSalaryMonth = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  const curMonth = parseInt(params.selectedPeriod.split('-')[1], 10);
  const curYear = params.selectedPeriod.split('-')[0];
  const prevMonth = monthTwoChar(curMonth === 1 ? 12 : curMonth - 1);
  const prevYear = curMonth === 1 ? curYear - 1 : curYear;
  const prevPeriod = `${prevYear}-${prevMonth}`;

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


    const newQuery = {};
    newQuery.$and = [query, { $or: [{ leftDate: null }, { leftDate: { $exists: false } }] }];
    query = newQuery;


    if (params.employeeId) {
      query = { _id: params.employeeId };
    }

    // TODO search only not completed candidates for authorized hr
    const candidates = await Employee.getEmployeesNoLean(query, params, true);


    // eslint-disable-next-line no-restricted-syntax
    for (const employee of candidates.items) {
      employee.salary = employee.salary || {};
      employee.salary[params.selectedPeriod] = employee.salary[params.selectedPeriod]
        || {
          period1: 0, period2: 0, bonus: 0, bonus0: 0,
        };
      employee.salary[prevPeriod] = employee.salary[prevPeriod]
        || {
          period1: 0, period2: 0, bonus: 0, bonus0: 0,
        };
      ['period1', 'period2', 'bonus0', 'bonus'].forEach((key) => {
        employee.salary[params.selectedPeriod][key] = Math.max(
          employee.salary[params.selectedPeriod][key], employee.salary[prevPeriod][key],
        );
      });

      employee.salary[params.selectedPeriod].accountId = employee.salary[prevPeriod].accountId
        || employee.salary[params.selectedPeriod].accountId;
      // eslint-disable-next-line no-await-in-loop
      await Employee.updateOne({ _id: employee._id }, { $set: { [`salary.${params.selectedPeriod}`]: employee.salary[params.selectedPeriod] } });
    }

    response.success(res, candidates);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 * [POST] /staff/import/archive
 */

const importStaffArchive = async (req, res) => {
  const params = getParams(req);
  const file = req.files.document;

  try {
    if (!file) {
      throw Error('File is required');
    }
    if (!params.workGroup) {
      throw Error('City is required');
    }
    const employee = await parseStaffArchive(file.path, params.workGroup, params.team);
    await Employee.insertMany(employee);
    fs.unlink(file.path, () => {
      response.success(res, { created: employee.length });
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

    const updateInfo = await Employee.update({ _id: params.itemId },
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
  getEmployeeSalary,
  updateEmployee,
  getStaffApplicationsPossible,
  getStaff,

  getEmployee,
  addEmployee,
  removeEmployee,

  updateCandidateField,
  importStaffArchive,

  updateSalary,
  pullSalaryMonth,
};
