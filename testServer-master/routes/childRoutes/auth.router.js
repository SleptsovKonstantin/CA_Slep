const { Router } = require('express');
const AuthConn = require('../../src/modules/ServicesConnector')('AUTH');

const router = Router();

router.post('/login', AuthConn.proxy);
router.post('/refresh', AuthConn.proxy);
router.get('/logout', AuthConn.proxy);


module.exports = router;
