const { Router } = require('express');
const { byToken } = require('../src/modules/Auth');

const router = Router();
const authRouter = require('./childRoutes/auth.router');
const interviewRouter = require('./childRoutes/interview.router');
const candidateRouter = require('./childRoutes/candidate.router');
const teamsRouter = require('./childRoutes/teams.router');
const kpiRouter = require('./childRoutes/kpi.router');
const usersRouter = require('./childRoutes/users.router');
const reportsRouter = require('./childRoutes/reports.router');
const workGroupsRouter = require('./childRoutes/work-groups.router');
const staffRouter = require('./childRoutes/staff.router');
const applicationsRouter = require('./childRoutes/applications.router');
const analyticsRouter = require('./childRoutes/analytics.router');
const channelsRouter = require('./childRoutes/channels.router');
const exportRouter = require('./childRoutes/export.router');

router.get('/', byToken, (req, res) => {
  res.send('Hello');
});
router.use('/auth', authRouter);
router.use('/interview', interviewRouter);
router.use('/candidate', candidateRouter);
router.use('/staff', staffRouter);
router.use('/teams', teamsRouter);
router.use('/users', usersRouter);
router.use('/kpi', kpiRouter);
router.use('/report', reportsRouter);
router.use('/work-groups', workGroupsRouter);
router.use('/applications', applicationsRouter);
router.use('/analytics', analyticsRouter);
router.use('/channels', channelsRouter);
router.use('/export', exportRouter);
module.exports = router;
