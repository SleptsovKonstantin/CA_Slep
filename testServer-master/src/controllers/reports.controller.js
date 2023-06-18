const _ = require('underscore');
const { CANDIDATE_STATUSES_INDEXED } = require('../constants/candidate');
const response = require('../helpers/response');
const { getParams } = require('../helpers/common');
const PERMISSIONS = require('../../config/Permisions.json');
const {
  Application,
  Report,
  Candidate,
  Employee,
  WorkGroup,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');

const isInRange = (val, start, end) => val >= start && val <= end;

const getApplicationsForMonth = (monthNum, workGroup) => {
  const query = {};
  const month = parseInt(monthNum, 10) + 1;
  const monthStart = new Date(`${month}-01-${new Date().getFullYear()}`);
  const monthEnd = new Date(monthStart.getTime());
  monthEnd.setMonth(month);
  //
  if (workGroup) {
    query.workGroup = workGroup;
  }
  query.$or = [
    { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: null }] },
    { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: { $gte: monthEnd } }] },
    { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: { $gte: monthStart } }] },
    { $and: [{ openedAt: { $gte: monthStart } }, { closedAtReal: { $lte: monthEnd } }] },
    // eslint-disable-next-line max-len
    { $and: [{ openedAt: { $lte: monthEnd } }, { closedAtReal: { $gte: monthEnd } }] },
    { $and: [{ openedAt: { $lte: monthEnd } }, { closedAtReal: { $gte: null } }] },
  ];


  return Application.find(query);
};

const getMainStaffReport = async (req, res) => {
  const params = getParams(req);
  try {
    const candidates = await Employee.getEmployees({ leftDate: null }, params);

    const counts = {};
    const statusNames = {
      intern: ['intern'],
      developer: ['developer'],
      middle_developer: ['developer'],
      tech_lead: ['tech_lead'],
    };


    const cd = new Date().getTime();
    const ms2weeks = 14 * 24 * 3600 * 1000;

    _.each(candidates.items, (it) => {
      const position = +it.position;
      _.each(statusNames, (statusIds, key) => {
        if (statusIds.indexOf(position) > -1) {
          if (key === 'intern') {
            const delta = cd - new Date(it.internDate);
            if (delta > ms2weeks) {
              counts[`${key}_2weeks`] = (counts[`${key}_2weeks`] || 0) + 1;
            }
          }
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    });

    response.success(res, counts);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

const reportFields = ['vkInterview', 'vkSent', 'vkAnswered', 'hhInit', 'hhOtkl', 'money', 'otherSent', 'otherAnswers', 'plan', 'dismissed'];

const initFields = (obj, fields) => {
  fields.forEach((field) => {
    obj[field] = obj[field] || 0;
  });
};

const addFieldsValue = (target, source, fields) => {
  fields.forEach((field) => {
    target[field] += parseInt(source[field] || 0, 10);
  });
};

const getMainReport = async (req, res) => {
  const params = getParams(req);
  try {
    const report = await Report.find({ month: params.month });
    const groupedByWorkGroup = {};
    const total = {
      workGroup: 'total',
      hired: 0,
      interviews: 0,
      plan: 0,
      reportId: 'total',
    };

    initFields(total, reportFields);

    report.forEach((item) => {
      groupedByWorkGroup[item.workGroup] = groupedByWorkGroup[item.workGroup] || {
        workGroup: item.workGroup,
        plan: item.plan,
      };
      const data = groupedByWorkGroup[item.workGroup];

      data.reportId = item._id;
      initFields(data, reportFields);

      if (item.days) {
        Object.keys(item.days)
          .forEach((day) => {
            const i = item.days[day];
            addFieldsValue(data, i, reportFields);
            addFieldsValue(total, i, reportFields);
          });
      }
    });

    const month = parseInt(params.month, 10) + 1;
    // const monthRaw = parseInt(params.month, 10);

    const monthStart = new Date(`${month}-01-${new Date().getFullYear()}`);
    const monthEnd = new Date(monthStart.getTime());
    const monthStartMs = monthStart.getTime();
    monthEnd.setMonth(month);
    const monthEndMs = monthEnd.getTime();
    const candidatesQuery = {
      $and: [{ updatedAt: { $gte: monthStart } }, { updatedAt: { $lte: monthEnd } }],
    };
    const dismissedQuery = {
      $and: [{ leftDate: { $gte: monthStart } },
        { leftDate: { $lte: monthEnd } }],
    };
    const hiredQuery = {
      $or: [
        {
          $and: [{ trainingDate: { $gte: monthStart } },
            { trainingDate: { $lte: monthEnd } }],
        },
        {
          $and: [{ internDate: { $gte: monthStart } },
            { internDate: { $lte: monthEnd } }],
        },
        {
          $and: [{ startWorkDate: { $gte: monthStart } },
            { startWorkDate: { $lte: monthEnd } }],
        },
      ],
    };
    const workGroups = await WorkGroup.find({ deleted: { $ne: true } })
      .lean();
    const applications = await getApplicationsForMonth(params.month);
    const ApplicationsPlansIndexed = applications.reduce((acc, item) => {
      acc[item.workGroup] = acc[item.workGroup] || 0;
      acc[item.workGroup] += item.plan;
      total.plan += item.plan;
      return acc;
    }, {});

    const workGroupsIndexes = workGroups.reduce((indexes, item) => {
      groupedByWorkGroup[item._id] = groupedByWorkGroup[item._id] || {
        workGroup: item._id,
        interviews: 0,
        dismissed: 0,
      };
      groupedByWorkGroup[item._id].plan = ApplicationsPlansIndexed[item._id];
      item.teams.forEach((t) => {
        indexes[t] = item._id;
      });
      return indexes;
    }, {});


    const candidates = await Candidate.find(candidatesQuery);

    candidates.forEach((candidate) => {
      groupedByWorkGroup[candidate.workGroup] = groupedByWorkGroup[candidate.workGroup] || {
        workGroup: candidate.workGroup,
      };
      groupedByWorkGroup[candidate.workGroup].plan = ApplicationsPlansIndexed[candidate.workGroup];
      const data = groupedByWorkGroup[candidate.workGroup];
      // const updateResultMonth = candidate.updateLog.result[0]
      //   && new Date(candidate.updateLog.result[0].changedAt).getMonth();
      // const createdMonth = new Date(candidate.createdAt).getMonth();
      // if ([CANDIDATE_STATUSES_INDEXED['Сотрудник'], CANDIDATE_STATUSES_INDEXED['Принят на работу']].includes(candidate.result) && (createdMonth === monthRaw || updateResultMonth === monthRaw)) {
      //   data.hired = (data.hired || 0) + 1;
      // }
      // if (candidate.result === CANDIDATE_STATUSES_INDEXED['Стажировка принял']) {
      //   data.onTeach = (data.onTeach || 0) + 1;
      // }
      if (candidate.result !== CANDIDATE_STATUSES_INDEXED['Не пришел на собес'] && isInRange(new Date(candidate.interviewDate).getTime(), monthStartMs, monthEndMs)) {
        data.interviews = (data.interviews || 0) + 1;
        total.interviews += 1;
      }
    });
    const employees = await Employee.find(dismissedQuery)
      .select('workGroup team');
    employees.forEach((employee) => {
      const workGroup = workGroupsIndexes[employee.team] || employee.workGroup;
      let data = groupedByWorkGroup[workGroup] || null;
      if (!data) {
        groupedByWorkGroup[workGroup] = {
          workGroup,
          interviews: 0,
          dismissed: 0,
        };
        data = groupedByWorkGroup[workGroup];
      }
      data.dismissed = (data.dismissed || 0) + 1;
      total.dismissed += 1;
    });
    const employeesHired = await Employee.find(hiredQuery);
    employeesHired.forEach((employee) => {
      const workGroup = workGroupsIndexes[employee.team] || employee.workGroup;
      let data = groupedByWorkGroup[workGroup] || null;
      if (!data) {
        groupedByWorkGroup[workGroup] = {
          workGroup,
          interviews: 0,
          dismissed: 0,
        };
        data = groupedByWorkGroup[workGroup];
      }
      const isStartWorkInRange = isInRange(new Date(employee.startWorkDate).getTime(),
        monthStartMs, monthEndMs);
      const isStartInternInRange = isInRange(new Date(employee.internDate).getTime(),
        monthStartMs, monthEndMs);
      const isOnTeach = isInRange(new Date(employee.trainingDate).getTime(),
        monthStartMs, monthEndMs);

      if (isOnTeach) {
        data.onTeach = (data.onTeach || 0) + 1;
        total.onTeach += 1;
        return;
      }
      if (employee.internDate && isStartInternInRange && !employee.trainingDate) {
        data.hired = (data.hired || 0) + 1;
        total.hired += 1;
        return;
      }
      if (employee.startWorkDate && isStartWorkInRange
        && !employee.trainingDate && !employee.internDate) {
        data.hired = (data.hired || 0) + 1;
        total.hired += 1;
      }
    });

    groupedByWorkGroup.total = total;
    response.success(res, groupedByWorkGroup);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


const groupReportsBy = (report, total, field) => {
  const groupedByWorkGroup = {};
  report.forEach((item) => {
    groupedByWorkGroup[item[field]] = groupedByWorkGroup[item[field]] || {
      [field]: item[field],
      workGroup: item.workGroup,
      plan: item.plan,
    };
    const data = groupedByWorkGroup[item[field]];

    data.reportId = item._id;
    initFields(data, reportFields);

    if (item.days) {
      Object.keys(item.days)
        .forEach((day) => {
          const i = item.days[day];
          addFieldsValue(data, i, reportFields);
          addFieldsValue(total, i, reportFields);
        });
    }
  });
  return groupedByWorkGroup;
};

const generateQueries = (monthStart, monthEnd) => {
  const candidatesQuery = {
    $and: [{ updatedAt: { $gte: monthStart } }, { updatedAt: { $lte: monthEnd } }],
  };
  const dismissedQuery = {
    $and: [{ leftDate: { $gte: monthStart } },
      { leftDate: { $lte: monthEnd } }],
  };
  const hiredQuery = {
    $or: [
      {
        $and: [{ trainingDate: { $gte: monthStart } },
          { trainingDate: { $lte: monthEnd } }],
      },
      {
        $and: [{ internDate: { $gte: monthStart } },
          { internDate: { $lte: monthEnd } }],
      },
      {
        $and: [{ startWorkDate: { $gte: monthStart } },
          { startWorkDate: { $lte: monthEnd } }],
      },
    ],
  };
  return { candidatesQuery, dismissedQuery, hiredQuery };
};

const getMainReportByUser = async (req, res) => {
  const params = getParams(req);
  try {
    const report = await Report.find({ month: params.month });
    const total = {
      workGroup: 'total',
      hired: 0,
      interviews: 0,
      plan: 0,
      reportId: 'total',
    };

    initFields(total, reportFields);

    const groupedByUser = groupReportsBy(report, total, 'hr');


    const month = parseInt(params.month, 10) + 1;
    // const monthRaw = parseInt(params.month, 10);

    const monthStart = new Date(`${month}-01-${new Date().getFullYear()}`);
    const monthEnd = new Date(monthStart.getTime());
    const monthStartMs = monthStart.getTime();
    monthEnd.setMonth(month);
    const monthEndMs = monthEnd.getTime();

    const { candidatesQuery, dismissedQuery, hiredQuery } = generateQueries(monthStart, monthEnd);

    const applications = await getApplicationsForMonth(params.month);
    const ApplicationsPlansIndexed = applications.reduce((acc, item) => {
      acc[item.workGroup] = acc[item.workGroup] || 0;
      acc[item.workGroup] += item.plan;
      total.plan += item.plan;
      return acc;
    }, {});

    const workGroups = await WorkGroup.find({ deleted: { $ne: true } })
      .lean();
    const workGroupsIndexes = workGroups.reduce((indexes, item) => {
      item.teams.forEach((t) => {
        indexes[t] = item._id;
      });
      return indexes;
    }, {});

    const candidates = await Candidate.find(candidatesQuery);

    candidates.forEach((candidate) => {
      let recruiters = { [candidate.mainRecruiterId]: true, [candidate.createdById]: true };

      if (candidate.updateLog?.mainRecruiterId?.length) {
        candidate.updateLog.mainRecruiterId.forEach((item) => {
          recruiters[item.toValue] = true;
        });
      }

      recruiters = Object.keys(recruiters);

      recruiters.forEach((id) => {
        groupedByUser[id] = groupedByUser[id] || {
          workGroup: candidate.workGroup,
          interviews: 0,
          plan: 0,
        };
        groupedByUser[id].plan = (groupedByUser[id].plan || 0)
          + ApplicationsPlansIndexed[candidate.workGroup];
        groupedByUser[id].interviews = (groupedByUser[id].interviews || 0) + 1;
      });


      if (candidate.result !== CANDIDATE_STATUSES_INDEXED['Не пришел на собес'] && isInRange(new Date(candidate.interviewDate).getTime(), monthStartMs, monthEndMs)) {
        total.interviews += 1;
      }
    });

    const employees = await Employee.find(dismissedQuery)
      .select('workGroup team');
    employees.forEach((employee) => {
      let recruiters = { [employee.mainRecruiterId]: true, [employee.createdById]: true };
      if (employee.updateLog?.mainRecruiterId?.length) {
        employee.updateLog.mainRecruiterId.forEach((item) => {
          recruiters[item.toValue] = true;
        });
      }

      recruiters = Object.keys(recruiters);
      const workGroup = workGroupsIndexes[employee.team] || employee.workGroup;
      recruiters.forEach((id) => {
        let data = groupedByUser[id] || null;
        if (!data) {
          groupedByUser[id] = {
            workGroup,
            interviews: 0,
            dismissed: 0,
          };
          data = groupedByUser[id];
        }
        data.dismissed = (data.dismissed || 0) + 1;
      });

      total.dismissed += 1;
    });

    const employeesHired = await Employee.find(hiredQuery);
    employeesHired.forEach((employee) => {
      const workGroup = workGroupsIndexes[employee.team] || employee.workGroup;

      let recruiters = { [employee.mainRecruiterId]: true, [employee.createdById]: true };

      if (employee.updateLog?.mainRecruiterId?.length) {
        employee.updateLog.mainRecruiterId.forEach((item) => {
          recruiters[item.toValue] = true;
        });
      }

      const isStartWorkInRange = isInRange(new Date(employee.startWorkDate).getTime(),
        monthStartMs, monthEndMs);
      const isStartInternInRange = isInRange(new Date(employee.internDate).getTime(),
        monthStartMs, monthEndMs);
      const isOnTeach = isInRange(new Date(employee.trainingDate).getTime(),
        monthStartMs, monthEndMs);

      recruiters = Object.keys(recruiters);
      recruiters.forEach((id) => {
        let data = groupedByUser[id] || null;
        if (!data) {
          groupedByUser[id] = {
            workGroup,
            interviews: 0,
            dismissed: 0,
          };
          data = groupedByUser[id];
        }
        data.dismissed = (data.dismissed || 0) + 1;
        if (isOnTeach) {
          data.onTeach = (data.onTeach || 0) + 1;
          return;
        }
        if (employee.internDate && isStartInternInRange && !employee.trainingDate) {
          data.hired = (data.hired || 0) + 1;
          return;
        }
        if (employee.startWorkDate && isStartWorkInRange
          && !employee.trainingDate && !employee.internDate) {
          data.hired = (data.hired || 0) + 1;
        }
      });


      if (isOnTeach) {
        total.onTeach += 1;
        return;
      }
      if (employee.internDate && isStartInternInRange && !employee.trainingDate) {
        total.hired += 1;
        return;
      }
      if (employee.startWorkDate && isStartWorkInRange
        && !employee.trainingDate && !employee.internDate) {
        total.hired += 1;
      }
    });

    groupedByUser.total = total;
    response.success(res, groupedByUser);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [GET] /report/team
 */
const getTeamReport = async (req, res) => {
  const params = getParams(req);
  const isViewer = Boolean(
    req.user.permissions.FULL || req.user.permissions.GLOBAL & PERMISSIONS.GLOBAL.RECRUTING_REPORT,
  );
  try {
    let applications = [];
    const query = {};
    if (params.workGroup) {
      query.workGroup = params.workGroup;
    }
    if (params.month) {
      query.month = params.month;
    }
    if (params.user) {
      query.hr = params.user;
    } else {
      query.$or = [{ hr: req.user._id }, { hr: { $exists: false } }];
    }

    if (params.month && params.workGroup) {
      applications = await getApplicationsForMonth(params.month, params.workGroup);
    }
    let report = await Report.findOne(query).lean();
    if (!report && !isViewer) {
      query.hr = req.user._id;
      report = await Report.create(query);
    }
    if (!report && isViewer) {
      report = await Report.create(query);
    }
    report = (report.toJSON && report.toJSON()) || report;
    report.plan = 0;
    report.planCompleted = 0;
    if (applications.length) {
      report.plan = applications.reduce((sum, item) => {
        sum += (item.plan || 0);
        if (item.closedAtReal) {
          report.planCompleted += (item.plan || 0);
        }
        return sum;
      }, 0);
    }

    response.success(res, report);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /interview/candidate
 */
const addReport = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  // TODO сделать ограничение что бы не добавлять одинаковых пользоателей
  const params = getParams(req);
  const mayGlobal = (req.user.permissions & (PERMISSIONS.R.WRITE_GLOBAL
    | PERMISSIONS.R.READ_GLOBAL))
    || req.user.isFull;

  if (params.hr && mayGlobal && !params.hrName) {
    throw new Error('Имя рекрутера обязательно');
  }
  try {
    const from = new Date(new Date().toDateString()).getTime();
    const to = from + 86400000;
    const existingQuery = {
      hr: req.user._id,
      team: req.user.team,
      createdAt: {
        $gt: from,
        $lt: to,
      },
    };

    const countExisting = await Report.count(existingQuery);
    if (countExisting) {
      response.error(res, STATUS_CODE.FORBIDDEN, 'Отчет за сегодняшний день уже создан', true);
      return;
    }
    const forSave = {
      ...params,
      team: req.user.team,
      hr: req.user._id,
      hrName: req.user.fullName,
    };

    const report = await Report.create(forSave);
    response.success(res, report);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [PUT] /interview/candidate
 */
const updateReport = async (req, res) => {
// TODO add resctriction for prevent edid earlier than 3 days
  const params = getParams(req);
  try {
    const forSave = {
      ...params,
    };
    delete forSave._id;

    if (!forSave.hr) {
      forSave.hr = req.user._id;
    }
    const updateInfo = await Report.updateOne({ _id: params.id },
      { $set: forSave });
    if (!updateInfo.n) {
      throw Error('Отчет не был обновлен');
    }

    response.success(res, updateInfo);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 * [PUT] /report/plan
 */
const updateReportPlan = async (req, res) => {
// TODO add resctriction for prevent edid earlier than 3 days
  const params = getParams(req);
  try {
    const updateInfo = await Report.updateOne({
      month: params.month,
      year: params.year,
      workGroup: params.workGroup,
    },
    { $set: { plan: params.plan } });

    if (!updateInfo.ok) {
      throw Error('Отчет не был обновлен');
    }
    if (!updateInfo.n) {
      const forSave = {
        days: {},
        plan: params.plan,
        team: req.user.team,
        hr: req.user._id,
        month: params.month,
        year: params.year,
        workGroup: params.workGroup,
      };
      await Report.create(forSave);
      updateInfo.n = 1;
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


module.exports = {
  getTeamReport,
  updateReport,
  getMainStaffReport,
  addReport,
  getMainReport,
  getMainReportByUser,
  updateReportPlan,
};
