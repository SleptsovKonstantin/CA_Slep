const { Router } = require('express');
const { permit } = require('../../src/modules/Auth');
const {
  getCandidates, addCandidate, updateCandidate, getCandidate,
} = require('../../src/controllers/candidate.controller');
const {
  getInterview, getInterviews, updateInterview, uploadHHCV, getHHCV, addInterviewComment,
} = require('../../src/controllers/interview.controller');
const PERMISSIONS = require('../../config/Permisions.json');

const router = Router();

router.get('/', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), getInterviews);
router.put('/', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), updateInterview);
router.get('/candidate', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), getCandidates);
router.get('/candidate/:id', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), getCandidate);
router.post('/candidate', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), addCandidate);
router.put('/candidate', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), updateCandidate);
router.post('/comment', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), addInterviewComment);
router.get('/:id', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), getInterview);
router.put('/hhcv', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), uploadHHCV);
router.get('/hhcv/:itemId', permit('GLOBAL', PERMISSIONS.GLOBAL.RECRUITING), getHHCV);

module.exports = router;
