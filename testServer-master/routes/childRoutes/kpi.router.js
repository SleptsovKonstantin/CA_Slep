const { Router } = require('express');
const { kpiTest } = require('../../src/controllers/kpi.controller');

const router = Router();

// pichugina.exceedteam@gmail.com
router.get('/test', kpiTest);

module.exports = router;
