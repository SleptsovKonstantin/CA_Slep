const { Router } = require('express');
const {
  getWorkGroups, addWorkGroup, updateWorkGroup, deleteWorkGroup,
} = require('../../src/controllers/workgroups.controller');
const { byToken } = require('../../src/modules/Auth');

const router = Router();

router.get('/', byToken, getWorkGroups);
router.post('/', byToken, addWorkGroup);
router.put('/', byToken, updateWorkGroup);
router.delete('/', byToken, deleteWorkGroup);
module.exports = router;
