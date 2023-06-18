const { body } = require('express-validator');
const { optional, string } = require('../tools/types');

const internInfoValidator = [
  body('futurePosition').custom(optional(string)),
];

module.exports = {
  internInfoValidator,
};
