const { getMonthStartEnd } = require('../helpers/common');
const {
  Employee, EmployeeCount,
} = require('../models');

/**
 * Counting employees by position, check if exist info for current month just skip
 * @returns {Promise<void>}
 */
module.exports = async () => {
  console.log('[CALCULATE EMPLOYEE COUNT] START');
  const queryEmployee = { deleted: { $ne: true } };
  const allEmployee = await Employee.find(queryEmployee).select('position workGroup leftDate');
  const { monthStart, monthEnd } = getMonthStartEnd();
  const from = new Date(monthStart.setDate(27));
  const queryCounter = {
    $and: [{ createdAt: { $gte: from } },
      { createdAt: { $lte: monthEnd } }],
  };
  const createdCounter = await EmployeeCount.count(queryCounter);
  if (createdCounter) {
    console.log('[CALCULATE EMPLOYEE COUNT] COUNT RECORDING ALREADY EXIST');
    return;
  }

  const countByPosition = allEmployee.reduce((indexed, item) => {
    indexed[item.workGroup] = indexed[item.workGroup] || {
      working: { total: 0, totalRaw: 0 },
      left: { total: 0, totalRaw: 0 },
    };
    const type = item.leftDate ? 'left' : 'working';

    // id: 'intern',
    // id: 'intern_ed',
    indexed.company[type][item.position] = (indexed.company[type][item.position] || 0) + 1;

    indexed[item.workGroup][type][item.position] = (indexed[item.workGroup][type][item.position]
      || 0) + 1;

    indexed[item.workGroup][type].totalRaw += 1;
    if (!['intern', 'intern_ed'].includes(item.position)) {
      indexed[item.workGroup][type].total += 1;
      indexed.company[`total_${type}`] += 1;
    }

    indexed.company[`total_${type}_raw`] += 1;

    return indexed;
  }, {
    company: {
      working: {},
      left: {},
      total_working: 0,
      total_left: 0,
      total_working_raw: 0,
      total_left_raw: 0,
    },
  });
  console.log('LOOOG', countByPosition.total_working_raw);

  await EmployeeCount.create({ count: countByPosition });

  console.log('[CALCULATE EMPLOYEE COUNT] END');
};
