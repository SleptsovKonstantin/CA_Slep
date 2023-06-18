const { body } = require('express-validator');
const {
  optional, arrayOf, date, string, shape,
} = require('../tools/types');
const { Account, Contact } = require('../tools/shapes');

const createCommonInfoValidator = [
  body('birthDate').custom(optional(date)),
  body('hiredDate').custom(optional(date)),
  body('contacts').custom(optional(arrayOf(Contact))),
  body('accounts').custom(optional(arrayOf(Account))),
];

const updateCommonInfoValidator = [
  body('birthDate').custom(optional(date)),
  body('hiredDate').custom(optional(date)),
];

const createUserAccountValidator = [
  body('login').custom(string),
  body('password').custom(string),
  body('url').custom(optional(string)),
  body('name').custom(optional(string)),
  body('phone').custom(optional(string)),
  body('secretAnswer').custom(optional(string)),
];

const updateUserAccountValidator = [
  body('login').custom(optional(string)),
  body('password').custom(optional(string)),
  body('url').custom(optional(string)),
  body('name').custom(optional(string)),
  body('phone').custom(optional(string)),
  body('secretAnswer').custom(optional(string)),
];

const userContactValidator = [
  body('contactInfo').custom(shape({})),
];

module.exports = {
  updateCommonInfoValidator,
  createCommonInfoValidator,
  createUserAccountValidator,
  updateUserAccountValidator,
  userContactValidator,
};
