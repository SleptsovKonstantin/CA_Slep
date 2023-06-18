const { validationResult } = require('express-validator');
const response = require('../../src/helpers/response');
const { STATUS_CODE } = require('../../config/constants.json');

const finishValidation = (message, code) => (req, res, next) => {
  message = message || 'Request validation error';
  code = code || STATUS_CODE.BAD_REQUEST;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response.error(res, code, { message, errors: errors.array() });
    return;
  }
  next();
};

module.exports = {
  finishValidation,
};
