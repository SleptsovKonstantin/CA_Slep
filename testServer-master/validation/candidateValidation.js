const { candidateInfoValidator } = require('./validators/candidate');
const { createCommonInfoValidator } = require('./validators/commonInfo');
const { basicUserValidator } = require('./validators/basicUser');

const { validateIds } = require('./tools/helpers');
const { finishValidation } = require('./tools/main');

const createCandidate = [
  ...basicUserValidator,
  ...createCommonInfoValidator,
  ...candidateInfoValidator,
  finishValidation(),
];

const updateCandidate = [
  ...validateIds('id'),
  ...candidateInfoValidator,
  finishValidation(),
];

module.exports = {
  createCandidate,
  updateCandidate,
};
