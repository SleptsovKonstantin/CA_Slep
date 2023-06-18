global.root_path = __dirname;

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const { DB_OPTIONS } = require('./config/db.json');

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log('SERVER IS RUNNING ON PORT', port));

mongoose.connect(process.env.DATABASE, DB_OPTIONS)
  .then(() => console.log('DB CONNECTED'))
  .catch(() => {
    console.log('DB CONNECTION FAILED');
    require('./src/helpers/server').shutDown(server);
  });

module.exports = app;
