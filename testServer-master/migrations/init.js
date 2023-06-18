const mongoose = require('mongoose');
require('dotenv').config();
const { DB_OPTIONS } = require('../config/db.json');


module.exports = (FN) => {
  mongoose.connect(process.env.DATABASE, DB_OPTIONS)
    .then(() => FN())
    .catch((e) => {
      console.trace('DB CONNECTION FAILED', e);
    });
};
