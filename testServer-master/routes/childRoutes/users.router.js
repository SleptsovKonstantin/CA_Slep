const { Router } = require('express');
const { byToken } = require('../../src/modules/Auth');
const { get } = require('../../src/modules/MasterConnector');

const router = Router();

router.get('/hr', byToken, get);
module.exports = router;
