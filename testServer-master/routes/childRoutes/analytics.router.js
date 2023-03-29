const { Router } = require('express');
const {
  getEmployeeCount,
  getEmployeeLeft,
  getEmployeeByChannel,
} = require('../../src/controllers/analytics.controller');

const { byToken } = require('../../src/modules/Auth');

const router = Router();

router.get('/employee/count', byToken, getEmployeeCount);
router.get('/employee/left', byToken, getEmployeeLeft);
router.get('/employee/channel', byToken, getEmployeeByChannel);
module.exports = router;
