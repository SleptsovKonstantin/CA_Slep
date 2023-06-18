const fs = require('fs');
const response = require('../helpers/response');
const { getParams } = require('../helpers/common');
const {
  Interview, Candidate,
} = require('../models');
const { STATUS_CODE } = require('../../config/constants.json');


const getDbFieldName = (name) => {
  if (/Date$/.test(name)) {
    return `dates.${name.replace('Date', '')}`;
  }
  if (['english', 'tech', 'labor', 'loyalty'].includes(name)) {
    return `questionnaire.${name}`;
  }
  return name;
};

/**
 * [GET] /interview
 */
const getInterviews = async (req, res) => {
  const params = getParams(req);
  const from = new Date(new Date().toDateString()).getTime();
  const to = from + 86400000;
  const mayGlobal = true; // TODO UPDATE LATER
  // const mayGlobal = req.user.permissions & (PERMISSIONS.R.WRITE_GLOBAL | PERMISSIONS.R.READ_GLOBAL);
  try {
    const query = {};
    if (!req.user.isFull && !mayGlobal) {
      query.team = req.user.team;
    }
    if ((mayGlobal || req.user.isFull) && params.team) {
      query.team = params.team;
    }

    if (params.today) {
      query['dates.interview'] = { $gt: new Date(from), $lte: new Date(to) };
    }

    if (params.position) {
      query.position = params.position;
    }

    if (params.from && params.to) {
      query.createdAt = { $gte: new Date(params.from), $lte: new Date(params.to) };
    }
    if (params.from && !params.to) {
      query.createdAt = { $gte: new Date(params.from) };
    }
    if (!params.from && params.to) {
      query.createdAt = { $lte: new Date(params.to) };
    }

    // TODO search only not completed candidates for authorized hr
    const interviews = await Interview.getInterviews(query, params);

    response.success(res, interviews);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [GET] /interview/:id
 */
const getInterview = async (req, res) => {
  const params = getParams(req);
  try {
    const query = {
      _id: params.id,
    };
    if (!req.user.isFull) {
      query.team = req.user.team;
    }
    // TODO search only not completed candidates for authorized hr
    const interviews = await Interview.findOne(query).populate('candidate');

    response.success(res, interviews);
  } catch (e) {
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [POST] /interview/comment
 * @apiParam {String} Comment is required
 */
// TODO add validations
const addInterviewComment = async (req, res) => {
  const params = getParams(req);

  const updateQuery = {};
  const query = {
    _id: params.itemId,
  };

  try {
    updateQuery.$push = {
      comments: {
        type: params.type || 'HR', // todo update later if needed
        userId: `${req.user._id}`,
        from: params.from || req.user.fullName,
        message: params.comment,
      },
    };
    const updateInfo = await Interview.findOneAndUpdate(query, updateQuery, { new: true });
    if (!updateInfo) {
      throw Error('Собеседование не было обновленно');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('addInterviewComment ', e);
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

/**
 * [PUT] /interview
 */
// TODO add validations
const updateInterview = async (req, res) => {
  const params = getParams(req);

  const query = {
    _id: params._id,
  };

  const forSave = {
    $addToSet: {
      updatedBy: req.user._id,
    },
    $push: {},
    $set: {},
  };
  try {
    const interviewInfo = await Interview.findOne(query);
    const candidate = await Candidate.findOne({ _id: `${interviewInfo.candidate}` });
    let lastInterview = null;

    Object.entries(params.values).forEach(([field, value]) => {
      forSave.$push[`updateLog.${getDbFieldName(field)}`] = {
        executedBy: req.user._id,
        executorName: req.user.fullName,
        createdAt: new Date(),
        value,
      };
      if (field === 'interviewDate') {
        lastInterview = value;
      }
      forSave.$set[getDbFieldName(field)] = value;
    });

    // eslint-disable-next-line max-len
    const isItLatest = new Date(lastInterview).getTime() > new Date(candidate.lastInterview).getTime();
    const isItSame = candidate.lastInterviewId === interviewInfo._id;

    if (lastInterview && (isItLatest || isItSame)) {
      candidate.lastInterview = new Date(lastInterview);
      candidate.lastInterviewId = interviewInfo._id;

      await candidate.save();
    }

    if (lastInterview && ['first_contact', 'not_created'].includes(candidate.status)) {
      forSave.$set.status = 'created';
    }


    // TODO search only not completed candidates for authorized hr
    const updateInfo = await Interview.findOneAndUpdate(query, forSave, { new: true });
    if (!updateInfo) {
      throw Error('Интервью не было обновленно');
    }

    response.success(res, updateInfo);
  } catch (e) {
    console.log('updateInterview ', e);
    // TODO add logger to handle errors
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};


const uploadHHCV = async (req, res) => {
  const file = req.files.document;
  const params = getParams(req);
  const filePath = `${__dirname}/../../public/hhcv/${params.itemId}.pdf`;

  try {
    fs.rename(file.path, filePath, async (err) => {
      if (err) throw err;
      const updateInfo = await Interview.findOneAndUpdate({ _id: params.itemId },
        { $set: { hhcv: true } }, { new: true });
      if (!updateInfo) {
        throw Error('Интервью не было обновленно');
      }
      response.success(res, updateInfo);
    });
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

const getHHCV = async (req, res) => {
  const params = getParams(req);
  const filePath = `${__dirname}/../../public/hhcv/${params.itemId}.pdf`;
  try {
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  } catch (e) {
    response.error(res, STATUS_CODE.SERVER_ERROR, e && e.message);
  }
};

module.exports = {
  getInterview,
  getInterviews,
  updateInterview,
  addInterviewComment,
  uploadHHCV,
  getHHCV,
};
