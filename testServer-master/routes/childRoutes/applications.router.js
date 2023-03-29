const { Router } = require('express');
const {
  getApplications, addApplication, updateApplication, deleteApplication,
} = require('../../src/controllers/application.controller');
const { byToken } = require('../../src/modules/Auth');

const router = Router();

const allowAllAppplications = (req, res, next) => {
  req.allowAll = true;
  next();
};

router.get('/', byToken, getApplications);
router.get('/all', byToken, allowAllAppplications, getApplications);
router.post('/', byToken, addApplication);
router.put('/', byToken, updateApplication);
router.delete('/:id', byToken, deleteApplication);
module.exports = router;
