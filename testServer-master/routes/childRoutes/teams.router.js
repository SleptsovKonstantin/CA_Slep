const { Router } = require('express');
const { get } = require('../../src/modules/MasterConnector');

const router = Router();

router.get('/hr', get);
module.exports = router;
