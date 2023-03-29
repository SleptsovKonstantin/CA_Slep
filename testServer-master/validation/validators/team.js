const { body } = require('express-validator');
const { optional } = require('../tools/types');
const { string, mongoId, arrayOf } = require('../tools/types');

const teamValidator = [
  body('name').custom(optional(string)),
  body('city').custom(optional(string)),
  body('owner').custom(optional(mongoId)),
  body('director').custom(optional(mongoId)),
  body('address').custom(optional(string)),
  body('teamLead').custom(optional(mongoId)),
  body('users').custom(optional(arrayOf(mongoId))),
];

module.exports = {
  teamValidator,
};
