const addFieldsHistory = (newVal, oldVal, userId) => {
  const now = new Date().getTime();
  const result = {};
  result.updateLog = newVal.updateLog || {};
  Object.keys(newVal).forEach((key) => {
    if (key === 'updateLog') {
      return;
    }
    if (key === 'comment') {
      result[key] = newVal[key];
      return;
    }
    const isDates = oldVal[key] && (typeof oldVal[key].getDate === 'function');
    const toCompareA = isDates ? new Date(newVal[key]).getTime() : `${newVal[key]}`;
    const toCompareB = isDates ? new Date(oldVal[key]).getTime() : `${oldVal[key]}`;

    if (toCompareA !== toCompareB) {
      result[key] = newVal[key];
      newVal.updateLog = newVal.updateLog || {};
      result.updateLog[key] = Array.isArray(newVal.updateLog[key]) ? newVal.updateLog[key] : [];
      result.updateLog[key].push({
        changedAt: now,
        changedBy: userId,
        fromValue: oldVal[key],
        toValue: newVal[key],
      });
    }
  });
  return result;
};

module.exports = {
  addFieldsHistory,
};
