const response = require('../helpers/response');
const { getParams } = require('../helpers/common');
const { WorkGroup } = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');


/**
 * [GET] /work-groups
 */
const getWorkGroups = async (req, res) => {
  const params = getParams(req);
  try {
    const query = {
      deleted: { $ne: true },
    };
    if (params.search) {
      // eslint-disable-next-line no-useless-escape
      const text = params.search.split(' ').map((i) => i.trim().replace(/([^а-яА-Я0-9a-zA-Z-_\/:\.])+/gui, '')).join('|');
      const re = new RegExp(`(${text})`, 'giu');
      const reQuery = { $regex: re };
      query.name = reQuery;
    }

    const groups = await WorkGroup.find(query);

    response.success(res, groups);
  } catch (e) {
    console.trace(e);
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /work-groups
 */
const addWorkGroup = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);

  try {
    const group = await WorkGroup.create(params);
    response.success(res, group);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [PUT] /workgroups
 */
const updateWorkGroup = async (req, res) => {
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

    const updateInfo = await WorkGroup.findOneAndUpdate({ _id: params._id }, saveParams,
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
 * [DELTE] /workgroups
 */
const deleteWorkGroup = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    const query = {
      _id: params.id,
    };

    const updateInfo = await WorkGroup.updateOne(query, { $set: { deleted: true } });
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
  deleteWorkGroup,
  updateWorkGroup,
  getWorkGroups,
  addWorkGroup,
};
