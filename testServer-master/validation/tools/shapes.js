const {
  shape, optional, string,
} = require('./types');

const Account = shape({
  login: string,
  password: string,
  url: optional(string),
  name: optional(string),
  phone: optional(string),
  secretAnswer: optional(string),
});

const Contact = shape({});

module.exports = {
  Account,
  Contact,
};
