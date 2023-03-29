const { Router } = require('express');
const {
  getChannels, addChannel, updateChannel, deleteChannel,
} = require('../../src/controllers/channels.controller');
const { byToken } = require('../../src/modules/Auth');

const router = Router();

router.get('/', byToken, getChannels);
router.post('/', byToken, addChannel);
router.put('/', byToken, updateChannel);
router.delete('/', byToken, deleteChannel);
module.exports = router;
