const { STATUS_CODE, DEFAULT_MESSAGES } = require('../../config/constants.json');

const formatData = (data) => {
  if (typeof data !== 'object') {
    data = { message: data };
  }
  return data;
};

const success = (res, data, shouldNotify = false) => {
  data = data || DEFAULT_MESSAGES['200'];
  data = formatData(data);
  res.status(STATUS_CODE.SUCCESS).json({ data, shouldNotify });
};

const rawMessage = (res, data) => {
  res.status(STATUS_CODE.SUCCESS).send(data);
};


const error = (res, code, data, shouldNotify = true) => {
  // TODO think about better implementation
  data = data || DEFAULT_MESSAGES[code];
  data = formatData(data);
  res.status(code).json({ ...data, shouldNotify });
};

module.exports = {
  success,
  error,
  rawMessage,
};
