const { body, query } = require('express-validator');
const {
  optional, string, number, mongoId, positiveNumber,
} = require('../tools/types');

const basicUserValidator = [
  body('name').custom(optional(string)),
  body('patronymic').custom(optional(string)),
  body('surname').custom(optional(string)),
  body('email').custom(optional(string)),
  body('permissions').custom(optional(number)),
  body('password').custom(optional(string)),
  body('team').custom(optional(mongoId)),
];

const userListValidator = [
  query('team').custom(optional(mongoId)),
  query('search').custom(optional(string)),
  query('sortBy').custom(optional(string)),
  query('page').custom(optional(positiveNumber)),
  query('limit').custom(optional(positiveNumber)),
];

module.exports = {
  basicUserValidator,
  userListValidator,
};
