const { param } = require('express-validator');
const { mongoId } = require('./types');

const validateIds = (...ids) => ids.map(
  (id) => param(id).custom(mongoId),
);

module.exports = {
  validateIds,
};
