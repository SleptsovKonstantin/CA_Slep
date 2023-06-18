const response = require('../helpers/response');
const { addFieldsHistory } = require('../helpers/logs');
const { getParams } = require('../helpers/common');
const {
  Application, Employee,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');
const PERMISSIONS = require('../../config/Permisions.json');

// eslint-disable-next-line
const getStaffApplicationsPossibleCount = (params) => new Promise(async (resolve) => {
  const query2Week = {
    application: params._id,
  };
  const queryLess2Week = {
    application: params._id,
  };

  const dateStart = new Date(params.openedAt);
  const dateStartMore2Week = new Date(dateStart.getTime() + (14 * 24 * 60 * 60 * 1000));
  if (!isNaN(dateStart.getTime())) {
    query2Week.internDate = { $gte: dateStartMore2Week };
    queryLess2Week.$and = [{ internDate: { $gte: dateStart } },
      { internDate: { $lte: dateStartMore2Week } }];
  }

  const countMore2Weeks = await Employee.count(query2Week);
  const countLess2Weeks = await Employee.count(queryLess2Week);

  resolve({ countMore2Weeks, countLess2Weeks });
});


/**
 * [GET] /applications
 */
const getApplications = async (req, res) => {
  const params = getParams(req);
  const MAY_GLOBAL = req.user.permissions.FULL || (req.user.permissions.GLOBAL
    & PERMISSIONS.GLOBAL.RECRUITING_REPORTS) || req.allowAll;
  console.log('MAY_GLOBAL', MAY_GLOBAL);
  try {
    const query = { closedAtReal: null };


    if (params.type) {
      query.type = params.type;
    }
    if (params.workGroup) {
      query.workGroup = params.workGroup;
    }
    if (params.position) {
      query.position = params.position;
    }

    if (params.showClosed === 'true') {
      query.closedAtReal = { $ne: null };
      delete query.$or;
    }
    if (params.month) {
      const month = parseInt(params.month, 10) + 1;
      const monthStart = new Date(`${month}-01-${new Date().getFullYear()}`);
      const monthEnd = new Date(monthStart.getTime());
      monthEnd.setMonth(month);

      query.$or = [
        { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: null }] },
        { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: { $gte: monthEnd } }] },
        { $and: [{ openedAt: { $lte: monthStart } }, { closedAtReal: { $gte: monthStart } }] },
        { $and: [{ openedAt: { $gte: monthStart } }, { closedAtReal: { $lte: monthEnd } }] },
        { $and: [{ openedAt: { $lte: monthEnd } }, { closedAtReal: { $gte: monthEnd } }] },
        { $and: [{ openedAt: { $lte: monthEnd } }, { closedAtReal: { $gte: null } }] },
      ];
    }
    if (!MAY_GLOBAL && !query.$or) {
      query.$or = [{ passiveSearchBy: req.user.employeeId },
        { activeSearchBy: req.user.employeeId }];
    }

    if (!MAY_GLOBAL && query.$or) {
      query.$and = [{ $or: query.$or }, {
        $or: [{ passiveSearchBy: req.user.employeeId },
          { activeSearchBy: req.user.employeeId }],
      }];
    }


    const applications = await Application.getApplications(query, params);

    let index = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const application of applications.items) {
      const data = await getStaffApplicationsPossibleCount(application);
      applications.items[index].countLess2Weeks = data.countLess2Weeks;
      applications.items[index].countMore2Weeks = data.countMore2Weeks;
      index++;
    }

    response.success(res, applications);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


/**
 * [POST] /applications
 */
const addApplication = async (req, res) => {
  // TODO add validation
  // TODO add team info for global hr
  // TODO сделать ограничение что бы не добавлять одинаковых пользоателей
  const params = getParams(req);
  const MAY_GLOBAL = req.user.permissions.FULL || (req.user.permissions.GLOBAL
    & PERMISSIONS.GLOBAL.RECRUITING_REPORTS);

  try {
    params.createdById = req.user._id;
    params.createdBy = req.user.fullName;
    if (!MAY_GLOBAL) {
      params.activeSearchBy = req.user.employeeId;
      params.passiveSearchBy = req.user.employeeId;
    }
    const application = await Application.create(params);
    response.success(res, application);
  } catch (e) {
    console.trace('[addApplication]', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};
/**
 * [PUT] /applications
 */
const updateApplication = async (req, res) => {
  const MAY_GLOBAL = req.user.permissions.FULL || (req.user.permissions.GLOBAL
    & PERMISSIONS.GLOBAL.RECRUITING_REPORTS);
  // TODO add validation
  // TODO add team info for global hr
  const params = getParams(req);
  try {
    let forSave = {
      ...params,
    };

    delete forSave._id;
    delete forSave.updatedBy;

    const item = await Application.findOne({ _id: params._id });
    if (!MAY_GLOBAL && !item.activeSearchBy) {
      forSave.activeSearchBy = req.user.employeeId;
    }
    if (!MAY_GLOBAL && !item.passiveSearchBy) {
      forSave.passiveSearchBy = req.user.employeeId;
    }

    forSave = addFieldsHistory(forSave, item, `${req.user._id}`);
    const updateInfo = await Application.updateOne({ _id: params._id },
      { $set: forSave, $addToSet: { updatedBy: `${req.user._id}` } });
    if (!updateInfo.n) {
      throw Error('Заявка не была обновлена');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [DELETE] /applications/:id
 */
const deleteApplication = async (req, res) => {
  const params = getParams(req);
  try {
    const updateInfo = await Application.deleteOne({ _id: params.id });
    if (!updateInfo.n) {
      throw Error('Заявка не была найдена');
    }
    response.success(res, updateInfo);
  } catch (e) {
    console.log('LOOOG', e);
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


module.exports = {
  updateApplication,
  getApplications,
  addApplication,
  deleteApplication,
};
