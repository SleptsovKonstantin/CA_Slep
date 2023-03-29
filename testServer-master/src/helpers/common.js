const crypto = require('crypto');

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomString = (size = 30) => crypto
  .randomBytes(size)
  .toString('base64')
  .slice(0, size);

const sample = (array) => array[randomNumber(0, array.length)];

const last = (array) => array[array.length - 1];

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

const tryIt = async (times, callback, delay = 500) => {
  times = Array.from(Array(times).keys());
  // eslint-disable-next-line no-restricted-syntax
  for (const time of times) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await callback();
      return { message: `Success with ${time + 1} time`, done: true };
      // eslint-disable-next-line no-empty
    } catch (e) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay);
    }
  }
  return { message: 'Failed', done: false };
};

const getParams = (req) => {
  let result = {};
  if (req.query) {
    result = Object.assign(result, req.query);
  }
  if (req.body) {
    result = Object.assign(result, req.body);
  }
  if (req.params) {
    result = Object.assign(result, req.params);
  }
  return result;
};

const getSubstantiveObject = (object) => {
  const resultObject = {};
  Object.keys(object).forEach((property) => {
    const value = object[property];
    if (!(value == null)) {
      resultObject[property] = value;
    }
  });
  return resultObject;
};

const getType = (a) => {
  if (typeof a === 'undefined') {
    return 'undefined';
  }
  // eslint-disable-next-line no-proto
  return a.__proto__.constructor.name;
};

const getPropByString = (obj, propString) => {
  if (!propString) {
    return obj;
  }

  let prop; const
    props = propString.split('.');
  let i = 0;
  for (let iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    const candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  return obj[props[i]];
};

const formatVkLink = (data) => {
  if (!data) {
    return '';
  }
  if (!/^http(s)?:\/\//.test(data)) {
    return `https://${data}`;
  }
  return data;
};

const getMonthStartEnd = (now = new Date()) => {
  const month = now.getMonth() + 1;
  const monthStart = new Date(`${month}-01-${now.getFullYear()}`);
  let monthEnd = new Date(monthStart.getTime());

  monthEnd.setMonth(month);

  monthEnd = new Date(monthEnd);

  return { monthStart, monthEnd };
};

module.exports = {
  formatVkLink,
  capitalize,
  randomNumber,
  sample,
  getParams,
  getSubstantiveObject,
  last,
  tryIt,
  randomString,
  getType,
  getPropByString,
  getMonthStartEnd,
};
