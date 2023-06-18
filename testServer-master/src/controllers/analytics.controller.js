/* eslint-disable camelcase */
const response = require('../helpers/response');
const { getParams } = require('../helpers/common');
const {
  EmployeeCount,
  Employee,
  Application,
  Candidate,
  Channel,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');
const { getMonthStartEnd } = require('../helpers/common');

const monthMs = 30 * 24 * 60 * 60 * 1000;
const rangesWorkTime = [
  {
    id: 0,
    from: 0,
    to: 0,
    name: 'Испытательный срок ',
    color: '#72B2F1FF',
  },
  {
    id: 1,
    from: 1,
    to: 5 * monthMs,
    name: '0 - 5 мес: ',
    color: '#72B2F1FF',
  },
  {
    id: 2,
    from: 5 * monthMs,
    to: 12 * monthMs,
    name: '5 мес - 1 год: ',
    color: '#444348FF',
  },
  {
    id: 3,
    from: 12 * monthMs,
    to: 18 * monthMs,
    name: '1  - 1.5 года: ',
    color: '#6BF672FF',
  },
  {
    id: 4,
    from: 18 * monthMs,
    to: 24 * monthMs,
    name: '1.5 - 2 года: ',
    color: '#FFA446FF',
  },
  {
    id: 5,
    from: 24 * monthMs,
    to: Infinity,
    name: '2+ года: ',
    color: '#857AF0FF',
  },
];


const getMonthDatesForRange = (from, to) => {
  const fromCopy = new Date(from);
  const toCopy = new Date(to);
  let date = new Date(from);
  const result = [fromCopy];
  if (fromCopy.getMonth() === toCopy.getMonth() && fromCopy.getFullYear() === toCopy.getFullYear()) {
    return result;
  }

  date = new Date(date.setMonth(date.getMonth() + 1));
  if (date.getMonth() === to.getMonth() && date.getFullYear() === to.getFullYear()) {
    return [fromCopy, toCopy];
  }
  while (!(date.getMonth() >= to.getMonth() && date.getFullYear() >= to.getFullYear())) {
    result.push(new Date(date));
    date = new Date(date.setMonth(date.getMonth() + 1));
  }

  result.push(toCopy);
  return result;
};

/**
 * Calculate Moving Analytics by Employees list from specific month
 * @param items
 */
const calculateAnalyticsByEmployees = (items, date) => {
  const initCounter = {
    worked: 0,
    left: 0,
    workPeriod: 0,
  };

  const countByPosition = {
    company: { total: { ...initCounter, workPeriodArr: [] } },
  };

  items.forEach(({
    leftDate,
    position,
    workGroup,
    startWorkDate,
  }) => {
    const type = leftDate ? 'left' : 'worked';
    const workPeriod = !startWorkDate ? 0 : new Date(leftDate || new Date(date)).getTime()
      - new Date(startWorkDate).getTime();

    countByPosition[workGroup] = countByPosition[workGroup] || { total: { ...initCounter, workPeriodArr: [] } };
    countByPosition.company[position] = countByPosition.company[position] || { ...initCounter, workPeriodArr: [] };
    countByPosition[workGroup][position] = countByPosition[workGroup][position]
      || { ...initCounter, workPeriodArr: [] };

    // inc counters
    countByPosition.company[position][type]++;
    countByPosition[workGroup][position][type]++;
    countByPosition[workGroup].total[type]++;
    countByPosition.company.total[type]++;
    // inc work period
    countByPosition.company.total.workPeriod += workPeriod;
    countByPosition[workGroup].total.workPeriod += workPeriod;
    countByPosition.company[position].workPeriod += workPeriod;
    countByPosition[workGroup][position].workPeriod += workPeriod;

    if (!leftDate) {
      countByPosition.company.total.workPeriodArr.push(workPeriod);
      countByPosition[workGroup].total.workPeriodArr.push(workPeriod);
      countByPosition.company[position].workPeriodArr.push(workPeriod);
      countByPosition[workGroup][position].workPeriodArr.push(workPeriod);
    }
  });

  return Object.keys(countByPosition)
    .reduce((result, key) => {
      result[key] = Object.keys(countByPosition[key])
        .reduce((count, position) => {
          const totalWorked = countByPosition[key][position].worked
            + countByPosition[key][position].left;

          count[position].workPeriodArr = countByPosition[key][position].workPeriodArr;
          count[position].totalWorked = totalWorked;
          if (totalWorked === 0) {
            count[position].movingCoeff = 0;
            count[position].avgWorkTimeTotal = 0;
            return count;
          }
          count[position].movingCoeff = Math.ceil((countByPosition[key][position].left
            / totalWorked)
            * 100);

          count[position].avgWorkTimeTotal = Math.ceil(count[position].workPeriod / totalWorked);
          return count;
        }, countByPosition[key]);
      return result;
    }, {});
};


/**
 * Calculate Live Analytics by Employees list from specific month
 * @param items
 */
const calculateLiveAnalyticsByEmployees = (items, date) => {
  const initCounter = {
    workPeriod: 0,
    fired: 0,
    resigned: 0,
    count: 0,
  };

  const countByPosition = {
    company: { total: { ...initCounter } },
  };

  items.forEach(({
    leftDate,
    position,
    workGroup,
    startWorkDate,
    status,
  }) => {
    const workPeriod = !leftDate ? 0 : new Date(leftDate || new Date(date)).getTime()
      - new Date(startWorkDate).getTime();

    const type = status === '40' ? 'fired' : 'resigned';

    countByPosition[workGroup] = countByPosition[workGroup] || { total: { ...initCounter } };
    countByPosition.company[position] = countByPosition.company[position] || { ...initCounter };
    countByPosition[workGroup][position] = countByPosition[workGroup][position]
      || { ...initCounter };

    // inc counters
    countByPosition.company[position].count++;
    countByPosition[workGroup][position].count++;
    countByPosition[workGroup].total.count++;
    countByPosition.company.total.count++;

    countByPosition.company[position][type]++;
    countByPosition[workGroup][position][type]++;
    countByPosition[workGroup].total[type]++;
    countByPosition.company.total[type]++;


    // inc work period
    countByPosition.company.total.workPeriod += workPeriod;
    countByPosition[workGroup].total.workPeriod += workPeriod;
    countByPosition.company[position].workPeriod += workPeriod;
    countByPosition[workGroup][position].workPeriod += workPeriod;
  });

  return Object.keys(countByPosition)
    .reduce((result, key) => {
      result[key] = Object.keys(countByPosition[key])
        .reduce((count, position) => {
          const totalLeft = countByPosition[key][position].count;

          count[position].totalLeft = totalLeft;

          if (totalLeft === 0) {
            count[position].avgWorkTimeLeft = 0;
            return count;
          }
          count[position].avgWorkTimeLeft = Math.ceil(count[position].workPeriod / totalLeft);
          count[position].totalResigned = !count[position].resigned ? 0
            : Math.round((count[position].resigned / totalLeft) * 100);
          count[position].totalResignedCount = count[position].resigned || 0;
          count[position].totalFired = !count[position].fired ? 0
            : Math.round((count[position].fired / totalLeft) * 100);
          count[position].totalFiredCount = count[position].fired || 0;
          return count;
        }, countByPosition[key]);
      return result;
    }, {});
};


/**
 *
 * Wrapping common methods at employee analytics
 *
 */
const employeeAnalyticsEndpointWrapper = async (initQuery, method, getQueryByMonth,
  getGeneralQueryAnd, params) => {
  const isDatesSame = params.from.getTime() === params.to.getTime();
  const queryGeneral = {
    ...initQuery,
  };
  const queryByMonth = [];


  if (params.to && params.from && !isDatesSame) {
    const monthsRange = getMonthDatesForRange(params.from, params.to);
    monthsRange.forEach((month) => {
      const {
        monthStart,
        monthEnd,
      } = getMonthStartEnd(month);
      queryByMonth.push({
        monthEnd,
        monthStart,
        query: getQueryByMonth(queryGeneral, month, monthEnd),
      });
    });
  }

  if (params.from && (isDatesSame || !params.to)) {
    const {
      monthStart,
      monthEnd,
    } = getMonthStartEnd(params.from);
    queryGeneral.$and = getGeneralQueryAnd(monthStart, monthEnd);
  }

  if (!queryByMonth.length) {
    const { monthEnd } = getMonthStartEnd(params.from);
    const data = await Employee.find(queryGeneral);
    const result = method(data, monthEnd);
    const key = `${new Date(params.from).getMonth()}_${new Date(params.from).getFullYear()}`;
    const info = {
      [key]: result,
    };
    return info;
  }


  const info = {};
  // eslint-disable-next-line no-restricted-syntax
  for await (const query of queryByMonth) {
    const {
      monthStart,
    } = query;
    const data = await Employee.find(query.query);
    const result = method(data, monthStart);
    const key = `${new Date(monthStart).getMonth()}_${new Date(monthStart).getFullYear()}`;
    info[key] = result;
  }

  return info;
};


const calculateSpeedOfClosingApplication = async (from, to) => {
  const monthsRange = getMonthDatesForRange(from, to);
  const queryByMonth = [];
  monthsRange.forEach((month) => {
    const {
      monthStart,
      monthEnd,
    } = getMonthStartEnd(month);
    queryByMonth.push({
      monthStart,
      monthEnd,
      query: {
        $and: [{ closedAtReal: { $gte: monthStart } },
          { closedAtReal: { $lte: monthEnd } }],
      },
    });
  });


  const result = {};

  const initCounters = {
    timeToCloseApplication: 0,
    timeToCloseApplicationPlan: 0,
    applications: 0,
  };

  // eslint-disable-next-line no-restricted-syntax
  for await (const query of queryByMonth) {
    const date = new Date(query.monthStart);
    const key = `${date.getMonth()}_${date.getFullYear()}`;
    const items = await Application.find(query.query);

    const count = {
      company: {},
    };

    items.forEach(({
      workGroup,
      position,
      openedAt,
      closedAt,
      closedAtReal,
    }) => {
      const timeToCloseApplication = new Date(closedAtReal).getTime()
        - new Date(openedAt).getTime();
      const timeToCloseApplicationPlan = !closedAt ? 0 : new Date(closedAt).getTime()
        - new Date(openedAt).getTime();

      count.company[position] = count.company[position] || { ...initCounters };
      count.company.total = count.company.total || { ...initCounters };
      count[workGroup] = count[workGroup] || {};
      count[workGroup][position] = count[workGroup][position] || { ...initCounters };
      count[workGroup].total = count[workGroup].total || { ...initCounters };

      count.company[position].applications++;
      count[workGroup][position].applications++;
      count[workGroup].total.applications++;
      count.company.total.applications++;

      count.company[position].timeToCloseApplication += timeToCloseApplication;
      count[workGroup][position].timeToCloseApplication += timeToCloseApplication;
      count[workGroup].total.timeToCloseApplication += timeToCloseApplication;
      count.company.total.timeToCloseApplication += timeToCloseApplication;

      count.company[position].timeToCloseApplicationPlan += timeToCloseApplicationPlan;
      count[workGroup][position].timeToCloseApplicationPlan += timeToCloseApplicationPlan;
      count[workGroup].total.timeToCloseApplicationPlan += timeToCloseApplicationPlan;
      count.company.total.timeToCloseApplicationPlan += timeToCloseApplicationPlan;
    });

    result[key] = count;
  }

  return result;
};


const calculatePassedIntern = async (from, to) => {
  const monthsRange = getMonthDatesForRange(from, to);
  const queryByMonth = [];
  monthsRange.forEach((month) => {
    const threeMonthsAgo = new Date(new Date(month).setMonth(month.getMonth() - 2));
    const {
      monthStart,
      monthEnd,
    } = getMonthStartEnd(threeMonthsAgo);
    const {
      monthStart: mst,
      monthEnd: med,
    } = getMonthStartEnd(month);
    queryByMonth.push({
      monthStart: mst,
      monthEnd: med,
      query: {
        $or: [
          {
            $and: [{ trainingDate: { $gte: monthStart } },
              { trainingDate: { $lte: monthEnd } }],
          },
          {
            $and: [{ internDate: { $gte: monthStart } },
              { internDate: { $lte: monthEnd } }, { trainingDate: null }],
          },
        ],
      },
    });
  });


  const result = {};

  const initCounters = {
    started3MonthsAgo: 0,
    passedInternPeriod: 0,
  };

  // eslint-disable-next-line no-restricted-syntax
  for await (const query of queryByMonth) {
    const date = new Date(query.monthEnd);
    const dateSt = new Date(query.monthStart);
    const key = `${dateSt.getMonth()}_${dateSt.getFullYear()}`;
    const items = await Employee.find(query.query);

    const count = {
      company: {},
    };

    items.forEach(({
      workGroup,
      position,
      startWorkDate,
    }) => {
      const passedIntern = new Date(startWorkDate).getTime() < date.getTime();

      count.company[position] = count.company[position] || { ...initCounters };
      count.company.total = count.company.total || { ...initCounters };
      count[workGroup] = count[workGroup] || {};
      count[workGroup][position] = count[workGroup][position] || { ...initCounters };
      count[workGroup].total = count[workGroup].total || { ...initCounters };

      count.company[position].started3MonthsAgo++;
      count[workGroup][position].started3MonthsAgo++;
      count[workGroup].total.started3MonthsAgo++;
      count.company.total.started3MonthsAgo++;

      if (passedIntern) {
        count.company[position].passedInternPeriod++;
        count[workGroup][position].passedInternPeriod++;
        count[workGroup].total.passedInternPeriod++;
        count.company.total.passedInternPeriod++;
      }
    });

    result[key] = count;
  }
  return result;
};


const calculateHiredCount = async (from, to) => {
  const monthsRange = getMonthDatesForRange(from, to);
  const queryByMonth = [];
  monthsRange.forEach((month) => {
    const {
      monthStart,
      monthEnd,
    } = getMonthStartEnd(month);
    const {
      monthStart: mst,
      monthEnd: med,
    } = getMonthStartEnd(month);
    queryByMonth.push({
      monthStart: mst,
      monthEnd: med,
      query: {
        $or: [
          {
            $and: [{ trainingDate: { $gte: monthStart } },
              { trainingDate: { $lte: monthEnd } }],
          },
          {
            $and: [{ internDate: { $gte: monthStart } },
              { internDate: { $lte: monthEnd } }, { trainingDate: null }],
          },
        ],
      },
    });
  });


  const result = {};

  const initCounters = {
    hired: 0,
  };

  // eslint-disable-next-line no-restricted-syntax
  for await (const query of queryByMonth) {
    const dateSt = new Date(query.monthStart);
    const key = `${dateSt.getMonth()}_${dateSt.getFullYear()}`;
    const items = await Employee.find(query.query);

    const count = {
      company: {},
    };

    items.forEach(({
      workGroup,
      position,
    }) => {
      count.company[position] = count.company[position] || { ...initCounters };
      count.company.total = count.company.total || { ...initCounters };
      count[workGroup] = count[workGroup] || {};
      count[workGroup][position] = count[workGroup][position] || { ...initCounters };
      count[workGroup].total = count[workGroup].total || { ...initCounters };

      count.company[position].hired++;
      count[workGroup][position].hired++;
      count[workGroup].total.hired++;
      count.company.total.hired++;
    });

    result[key] = count;
  }
  return result;
};


const getQueryByMonthMoving = (queryGeneral, month, monthEnd) => ({
  ...queryGeneral,
  $and: [{ startWorkDate: { $lte: monthEnd } }, {
    $or: [{ leftDate: { $exists: false } }, {
      $and: [{ leftDate: { $gte: month } },
        { leftDate: { $lte: monthEnd } }],
    }],
  }],
});

const getGeneralQueryAndMoving = (monthStart, monthEnd) => [{ startWorkDate: { $lte: monthEnd } }, {
  $or: [{ leftDate: { $exists: false } }, {
    $and: [{ leftDate: { $gte: monthStart } },
      { leftDate: { $lte: monthEnd } }],
  }],
}];

const getQueryByMonthLive = (queryGeneral, month, monthEnd) => ({
  ...queryGeneral,
  $and: [{ leftDate: { $gte: month } },
    { leftDate: { $lte: monthEnd } }],
});

const getGeneralQueryAndLive = (monthStart, monthEnd) => [{ leftDate: { $gte: monthStart } },
  { leftDate: { $lte: monthEnd } }];


const mergeResultObj = (result, obj) => {
  Object.keys(obj)
    .forEach((month) => {
      result[month] = result[month] || {};
      Object.keys(obj[month])
        .forEach((group) => {
          result[month][group] = result[month][group] || {};
          Object.keys(obj[month][group])
            .forEach((position) => {
              result[month][group][position] = result[month][group][position] || {};
              result[month][group][position] = {
                ...result[month][group][position],
                ...obj[month][group][position],
              };
            });
        });
    });

  return result;
};

/**
 * /analytics/employee/count
 * @param req
 * @param res
 */
const getEmployeeCount = async (req, res) => {
  const params = getParams(req);
  params.to = params.to ? new Date(params.to) : false;
  params.to = params.to ? new Date(params.to.setMonth(params.to.getMonth())) : false;
  params.from = params.from ? new Date(params.from) : false;
  params.from = params.from ? new Date(params.from.setMonth(params.from.getMonth())) : false;

  if (params.from && !params.to) {
    params.to = new Date(params.from);
  }
  try {
    const countQuery = {};
    const { monthEnd } = getMonthStartEnd(new Date(params.to));
    countQuery.$and = [{ createdAt: { $gte: params.from } },
      { createdAt: { $lte: monthEnd } }];
    const data = await EmployeeCount.find(countQuery);

    const movingInfo = await employeeAnalyticsEndpointWrapper(
      { deleted: { $ne: true } },
      calculateAnalyticsByEmployees,
      getQueryByMonthMoving,
      getGeneralQueryAndMoving, params,
    );
    console.log('LOOOG', 1);
    const liveInfo = await employeeAnalyticsEndpointWrapper({
      startWorkDate: { $ne: null },
      leftDate: { $ne: null },
      deleted: { $ne: true },
    },
    calculateLiveAnalyticsByEmployees,
    getQueryByMonthLive,
    getGeneralQueryAndLive, params);
    console.log('LOOOG', 2);
    const applicationsInfo = await calculateSpeedOfClosingApplication(params.from, params.to);
    console.log('LOOOG', 3);
    const internInfo = await calculatePassedIntern(params.from, params.to);
    const hiredInfo = await calculateHiredCount(params.from, params.to);
    console.log('LOOOG', 4);
    const result = {};

    mergeResultObj(result, movingInfo);
    mergeResultObj(result, applicationsInfo);
    mergeResultObj(result, internInfo);
    mergeResultObj(result, liveInfo);
    mergeResultObj(result, hiredInfo);
    data.forEach((item) => {
      const month = `${new Date(item.createdAt).getMonth()}_${new Date(item.createdAt).getFullYear()}`;
      result[month] = result[month] || {};
      Object.keys(item.count)
        .forEach((group) => {
          result[month][group] = result[month][group] || {};
          Object.keys(item.count[group].left)
            .forEach((position) => {
              if (position === 'totalRaw') {
                result[month][group].total = result[month][group].total || {};
                result[month][group].total = {
                  ...result[month][group].total,
                  leftCountRaw: item.count[group].left.totalRaw,
                };
                return;
              }
              if (position === 'total') {
                result[month][group].total = result[month][group].total || {};
                result[month][group].total = {
                  ...result[month][group].total,
                  leftCount: item.count[group].left.total,
                };
                return;
              }
              result[month][group][position] = result[month][group][position] || {};
              result[month][group][position] = {
                ...result[month][group][position],
                leftCount: item.count[group].left[position],
              };
            });
          Object.keys(item.count[group].working)
            .forEach((position) => {
              if (position === 'totalRaw') {
                result[month][group].total = result[month][group].total || {};
                result[month][group].total = {
                  ...result[month][group].total,
                  workedCountRaw: item.count[group].working.totalRaw,
                };
                return;
              }
              if (position === 'total') {
                result[month][group].total = result[month][group].total || {};
                result[month][group].total = {
                  ...result[month][group].total,
                  workedCount: item.count[group].working.total,
                };
                return;
              }
              result[month][group][position] = result[month][group][position] || {};
              result[month][group][position] = {
                ...result[month][group][position],
                workedCount: item.count[group].working[position],
              };
            });
          if (group === 'company') {
            result[month][group].total = {
              ...result[month][group].total,
              workedCount: item.count[group].total_working,
              workedCountRaw: item.count[group].total_working_raw,
              leftCount: item.count[group].total_left,
              leftCountRaw: item.count[group].total_left_raw,
            };
          }
        });
    });


    response.success(res, result);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
// setTimeout(getEmployeeStat, 5000);

/**
 * {get} /analytics/employee/left
 */

const getEmployeeLeft = async (req, res) => {
  const params = getParams(req);

  params.to = params.to ? new Date(params.to) : false;
  params.to = params.to ? new Date(params.to.setMonth(params.to.getMonth())) : false;
  params.from = params.from ? new Date(params.from) : false;
  params.from = params.from ? new Date(params.from.setMonth(params.from.getMonth())) : false;
  const { monthStart } = getMonthStartEnd(params.from);
  const { monthEnd } = getMonthStartEnd(params.to);

  try {
    const query = {
      leftDate: { $ne: null },
      deleted: { $ne: true },
      $and: [{ leftDate: { $gte: monthStart } },
        { leftDate: { $lte: monthEnd } }],
    };
    const data = await Employee.find(query);
    const initCounter = {
      worked: 0,
      fired: 0,
      resigned: 0,
      count: 0,
    };
    const initCounterR = {
      worked: 0,
      fired: 0,
      resigned: 0,
      count: 0,
    };
    const countByPosition = {
      company: {
        total: {
          ...initCounter, leftReason: {}, byRanges: {}, workPeriodArr: [],
        },
      },
    };

    data.forEach(({
      leftDate,
      position,
      workGroup,
      leftSummary,
      status,
      startWorkDate,
    }) => {
      const workPeriod = !startWorkDate ? 0 : new Date(leftDate).getTime()
        - new Date(startWorkDate).getTime();
      const type = status === '40' ? 'fired' : 'resigned';

      const lenR = rangesWorkTime.length;
      let rangeId = 0;
      for (let i = 0; i < lenR; i++) {
        if (workPeriod > rangesWorkTime[i].from && workPeriod <= rangesWorkTime[i].to) {
          rangeId = rangesWorkTime[i].id;
        } else if (rangesWorkTime[i].from === 0 && workPeriod === 0) {
          rangeId = rangesWorkTime[i].id;
        }
      }


      // initialisation
      countByPosition[workGroup] = countByPosition[workGroup] || {
        total: {
          ...initCounter, leftReason: {}, byRanges: {}, workPeriodArr: [],
        },
      };
      countByPosition.company[position] = countByPosition.company[position] || {
        ...initCounter, leftReason: {}, byRanges: {}, workPeriodArr: [],
      };
      countByPosition[workGroup][position] = countByPosition[workGroup][position]
        || {
          ...initCounter, leftReason: {}, byRanges: {}, workPeriodArr: [],
        };

      countByPosition.company[position].leftReason[leftSummary] = countByPosition.company[position].leftReason[leftSummary] || 0;
      countByPosition[workGroup][position].leftReason[leftSummary] = countByPosition[workGroup][position].leftReason[leftSummary] || 0;
      countByPosition[workGroup].total.leftReason[leftSummary] = countByPosition[workGroup].total.leftReason[leftSummary] || 0;
      countByPosition.company.total.leftReason[leftSummary] = countByPosition.company.total.leftReason[leftSummary] || 0;

      // byRanges
      countByPosition.company[position].byRanges[rangeId] = countByPosition.company[position].byRanges[rangeId] || { ...initCounterR, leftReason: {} };
      countByPosition[workGroup][position].byRanges[rangeId] = countByPosition[workGroup][position].byRanges[rangeId] || { ...initCounterR, leftReason: {} };
      countByPosition[workGroup].total.byRanges[rangeId] = countByPosition[workGroup].total.byRanges[rangeId] || { ...initCounterR, leftReason: {} };
      countByPosition.company.total.byRanges[rangeId] = countByPosition.company.total.byRanges[rangeId] || { ...initCounterR, leftReason: {} };

      countByPosition.company[position].byRanges[rangeId].leftReason[leftSummary] = countByPosition.company[position].byRanges[rangeId].leftReason[leftSummary] || 0;
      countByPosition[workGroup][position].byRanges[rangeId].leftReason[leftSummary] = countByPosition[workGroup][position].byRanges[rangeId].leftReason[leftSummary] || 0;
      countByPosition[workGroup].total.byRanges[rangeId].leftReason[leftSummary] = countByPosition[workGroup].total.byRanges[rangeId].leftReason[leftSummary] || 0;
      countByPosition.company.total.byRanges[rangeId].leftReason[leftSummary] = countByPosition.company.total.byRanges[rangeId].leftReason[leftSummary] || 0;

      // store work period for different groups
      countByPosition.company.total.workPeriodArr.push(workPeriod);
      countByPosition[workGroup].total.workPeriodArr.push(workPeriod);
      countByPosition.company[position].workPeriodArr.push(workPeriod);
      countByPosition[workGroup][position].workPeriodArr.push(workPeriod);

      countByPosition.company[position][type]++;
      countByPosition[workGroup][position][type]++;
      countByPosition[workGroup].total[type]++;
      countByPosition.company.total[type]++;

      countByPosition.company[position].count++;
      countByPosition[workGroup][position].count++;
      countByPosition[workGroup].total.count++;
      countByPosition.company.total.count++;

      countByPosition.company[position].leftReason[leftSummary]++;
      countByPosition[workGroup][position].leftReason[leftSummary]++;
      countByPosition[workGroup].total.leftReason[leftSummary]++;
      countByPosition.company.total.leftReason[leftSummary]++;

      // additional info if selected range
      countByPosition.company[position].byRanges[rangeId][type]++;
      countByPosition[workGroup][position].byRanges[rangeId][type]++;
      countByPosition[workGroup].total.byRanges[rangeId][type]++;
      countByPosition.company.total.byRanges[rangeId][type]++;

      countByPosition.company[position].byRanges[rangeId].count++;
      countByPosition[workGroup][position].byRanges[rangeId].count++;
      countByPosition[workGroup].total.byRanges[rangeId].count++;
      countByPosition.company.total.byRanges[rangeId].count++;

      countByPosition.company[position].byRanges[rangeId].leftReason[leftSummary]++;
      countByPosition[workGroup][position].byRanges[rangeId].leftReason[leftSummary]++;
      countByPosition[workGroup].total.byRanges[rangeId].leftReason[leftSummary]++;
      countByPosition.company.total.byRanges[rangeId].leftReason[leftSummary]++;
    });

    response.success(res, countByPosition);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * {get} /analytics/employee/channel
 */

const getEmployeeByChannel = async (req, res) => {
  const params = getParams(req);

  params.to = params.to ? new Date(params.to) : false;
  params.to = params.to ? new Date(params.to.setMonth(params.to.getMonth())) : false;
  params.from = params.from ? new Date(params.from) : false;
  params.from = params.from ? new Date(params.from.setMonth(params.from.getMonth())) : false;
  const { monthStart } = getMonthStartEnd(params.from);
  const { monthEnd } = getMonthStartEnd(params.to);

  try {
    const query = {
      deleted: { $ne: true },
      $and: [{ createdAt: { $gte: monthStart } },
        { createdAt: { $lte: monthEnd } }],
    };
    const data = await Candidate.find(query);
    const initCounter = {
      inner: 0,
      outer: 0,
      total: 0,
      hired: 0,
      not_passed: 0,
    };
    const countByPosition = {
      company: {
        total: {},
      },
    };

    const channels = await Channel.find(query);
    const channelsIndexes = channels.reduce((acc, item) => {
      acc[item.id] = {
        name: item.name,
        type: item.type === 'вход.' ? 'inner' : 'outer',
      };
      return acc;
    }, {});

    data.forEach(({
      channel: channelId,
      position,
      workGroup,
      employee,
    }) => {
      const status = employee ? 'hired' : 'not_passed';
      const type = channelsIndexes[channelId]?.type;
      const channel = channelsIndexes[channelId]?.name;

      // initialisation
      countByPosition[workGroup] = countByPosition[workGroup] || { total: {} };
      countByPosition[workGroup].total[channel] = countByPosition[workGroup].total[channel] || {
        ...initCounter,
      };
      countByPosition.company[position] = countByPosition.company[position] || {};
      countByPosition.company[position][channel] = countByPosition.company[position][channel] || {
        ...initCounter,
      };
      countByPosition.company.total[channel] = countByPosition.company.total[channel] || {
        ...initCounter,
      };
      countByPosition[workGroup][position] = countByPosition[workGroup][position] || {};
      countByPosition[workGroup][position][channel] = countByPosition[workGroup][position][channel]
        || {
          ...initCounter,
        };


      countByPosition.company[position][channel][type]++;
      countByPosition[workGroup][position][channel][type]++;
      countByPosition[workGroup].total[channel][type]++;
      countByPosition.company.total[channel][type]++;

      countByPosition.company[position][channel][status]++;
      countByPosition[workGroup][position][channel][status]++;
      countByPosition[workGroup].total[channel][status]++;
      countByPosition.company.total[channel][status]++;

      countByPosition.company[position][channel].total++;
      countByPosition[workGroup][position][channel].total++;
      countByPosition[workGroup].total[channel].total++;
      countByPosition.company.total[channel].total++;
    });

    response.success(res, countByPosition);
  } catch (e) {
    console.trace(e);
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

module.exports = {
  getEmployeeCount,
  getEmployeeLeft,
  getEmployeeByChannel,
};
