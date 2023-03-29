const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const formData = require('express-form-data');

const swaggerDocument = require('./doc/swagger.json');
const { herokuCors } = require('./src/middlewares');
const routes = require('./routes');
require('./src/modules/cron');
// eslint-disable-next-line camelcase

const app = express();

app.use(morgan('dev'));
app.use(formData.parse());
app.use(express.json());
app.use(herokuCors);
app.use(cors({
  credentials: true,
  origin(origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
    callback(null, origin);
    // } else {
    //   console.log('LOOOG', origin);
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
}));

app.use('/public', express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);


module.exports = app;
