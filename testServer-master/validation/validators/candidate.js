const { body } = require('express-validator');
const {
  optional, arrayOf, date, string, mongoId, bool,
} = require('../tools/types');

const candidateInfoValidator = [
  body('advantages').custom(optional(arrayOf(string))),
  body('disadvantages').custom(optional(arrayOf(string))),
  body('interviewDate').custom(optional(date)),
  body('comment').custom(optional(string)),
  body('resultDate').custom(optional(date)),
  body('resultComment').custom(optional(string)),
  body('hadInterview').custom(optional(bool)),
  body('status').custom(optional(string)),
  body('interviewers').custom(optional(arrayOf(mongoId))),
];

module.exports = {
  candidateInfoValidator,
};
