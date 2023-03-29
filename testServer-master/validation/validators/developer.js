const { body } = require('express-validator');
const {
  optional, arrayOf, string, mongoId, bool,
} = require('../tools/types');

const developerInfoValidator = [
  body('projects').custom(optional(arrayOf(string))),
  body('techStack').custom(optional(arrayOf(string))),
  body('devLevel').custom(optional(string)),
  body('hasUpwork').custom(optional(bool)),
  body('salesManager').custom(optional(mongoId)),
];

module.exports = {
  developerInfoValidator,
};
