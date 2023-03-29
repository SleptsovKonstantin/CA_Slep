const { Router } = require('express');
const { exportCandidatesToXlsx, exportEmployeesToXlsx } = require('../../src/controllers/export.controller');
const { byToken, permit } = require('../../src/modules/Auth');
const PERMISSIONS = require('../../config/Permisions.json');

const router = Router();

router.get('/candidates.xlsx', byToken, permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING_REPORTS), exportCandidatesToXlsx);
router.get('/employees.xlsx', byToken, permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING_REPORTS), exportEmployeesToXlsx);
module.exports = router;
