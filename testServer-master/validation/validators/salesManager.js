const { body } = require('express-validator');
const {
  optional, number, mongoId, bool, arrayOf,
} = require('../tools/types');

const salesManagerInfoValidator = [
  body('general').custom(optional(bool)),
  body('salesDeals').custom(optional(arrayOf(number))),
  body('developers').custom(optional(arrayOf(mongoId))),
];

module.exports = {
  salesManagerInfoValidator,
};
