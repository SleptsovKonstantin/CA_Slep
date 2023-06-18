const { header, body } = require('express-validator');
const {
  string, JWT, mongoId, shape,
} = require('../tools/types');

const authorizationValidator = [
  header('authorization').custom(JWT),
];

const updateInterviewValidation = [
  body('field').isIn(['hhcv', 'interviewDate', 'questionnaire', 'status', 'dates', 'position', 'team', 'techDev']),
  body('password').custom(string),
];
const refreshValidator = [
  body('id').custom(mongoId),
  body('token').custom(shape({
    access_token: JWT,
    refresh_token: JWT,
  })),
];

module.exports = {
  refreshValidator,
  authorizationValidator,
  updateInterviewValidation,
};
