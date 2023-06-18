const response = require('../helpers/response');
const { getParams } = require('../helpers/common');
const { Channel } = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');


/**
 * [GET] /channels
 */
const getChannels = async (req, res) => {
  try {
    const query = {
    };
    const groups = await Channel.find(query);
    response.success(res, groups);
  } catch (e) {
    console.trace(e);
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /channels
 */
const addChannel = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);

  try {
    const groups = await Channel.find({ }).select('id');
    const newId = Math.max(...groups.map((i) => i.id), 0) + 1;
    const group = await Channel.create({ ...params, id: newId });
    response.success(res, group);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [PUT] /channels
 */
const updateChannel = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const forSave = {
      ...params,
    };

    delete forSave._id;
    delete forSave.updatedBy;

    const saveParams = { $set: forSave, $addToSet: { updatedBy: `${req.user._id}` } };

    const updateInfo = await Channel.findOneAndUpdate({ _id: params._id }, saveParams,
      { new: true });
    if (!updateInfo) {
      throw Error('Рабочая группа не был обновлен');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [DELTE] /channels
 */
const deleteChannel = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const query = {
      _id: params.id,
    };

    const updateInfo = await Channel.updateOne(query, { $set: { deleted: true } });
    if (!updateInfo.n) {
      throw Error('Рабочая группа не найдена');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


module.exports = {
  deleteChannel,
  updateChannel,
  getChannels,
  addChannel,
};
