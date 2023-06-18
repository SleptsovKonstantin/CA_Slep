const { Router } = require('express');
const { byToken, permit } = require('../../src/modules/Auth');
const {
  getTeamReport, getMainStaffReport, updateReport, addReport, getMainReport, updateReportPlan,
  getMainReportByUser,
} = require('../../src/controllers/reports.controller');
const PERMISSIONS = require('../../config/Permisions.json');

const router = Router();

// pichugina.exceedteam@gmail.com
router.get('/team', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), byToken, getTeamReport);
router.get('/staff-main', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING_REPORTS), getMainStaffReport);
router.get('/main', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING_REPORTS), getMainReport);
router.get('/main/user', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING_REPORTS), getMainReportByUser);
router.put('/plan', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), updateReportPlan);
router.put('/:id', byToken, updateReport);
router.post('/', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), addReport);

module.exports = router;
