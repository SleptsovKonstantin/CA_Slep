const { authorizationValidator, loginValidation, refreshValidator } = require('./validators/auth');
const { finishValidation } = require('./tools/main');
const { STATUS_CODE } = require('../config/constants.json');

const token = [
  ...authorizationValidator,
  finishValidation('Missing authorization header', STATUS_CODE.UNAUTHORIZED),
];

const login = [
  ...loginValidation,
  finishValidation('Invalid credentials'),
];

const refresh = [
  ...refreshValidator,
  finishValidation('Invalid credentials'),
];

module.exports = {
  refresh,
  login,
  token,
};
