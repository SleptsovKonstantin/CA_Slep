const fs = require('fs');
const { getParams } = require('../helpers/common');

const response = require('../helpers/response');
const { STATUS_CODE } = require('../../config/constants.json');
const AuthConn = require('./ServicesConnector')('AUTH');
const { encodePermissions } = require('../helpers/permissions');

const { LOCAL_COMMUNICATION_PATH } = process.env;
let LOCAL_TOKEN;

fs.readFile((global.root_path || '') + LOCAL_COMMUNICATION_PATH, 'utf-8', (e, data) => {
  LOCAL_TOKEN = (data || '').replace('\n', '');
});


const byToken = async (req, res, next) => {
  try {
    const user = await AuthConn.checkToken(req);
    req.user = user;
    next();
  } catch (e) {
    if (e && (e.message === 'invalid token' || e.message === 'jwt malformed')) {
      response.error(res, STATUS_CODE.FORBIDDEN);
      return;
    }
    if ((e && (e.message === 'jwt expired')) || e === 'Not found') {
      response.error(res, STATUS_CODE.UNAUTHORIZED);
      return;
    }
    if (e === 'UNAUTHORIZED') {
      response.error(res, STATUS_CODE.UNAUTHORIZED);
      return;
    }
    response.error(res, STATUS_CODE.SERVER_ERROR, e);
  }
};

const permit = (section, ...allowedPermissions) => (req, res, next) => byToken(req, res, () => {
  const allowed = encodePermissions(...allowedPermissions);
  if (req.user.isFull) {
    next();
    return;
  }
  console.log('LOOOG', allowed, section, req.user.permissions);
  if (allowed & req.user.permissions[section]) {
    next();
    console.log('LOOOG', 'NEEEEXT');
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

const permitTeam = (section, ...allowedPermissions) => (req, res, next) => byToken(req, res, () => {
  const allowed = encodePermissions(...allowedPermissions);
  const params = getParams(req);
  const teamId = params.team || params.teamId || params.id;

  if (req.user.isFull) {
    next();
    return;
  }
  if (!teamId) {
    response.error(res, STATUS_CODE.FORBIDDEN);
    return;
  }
  if (!req.user.permissions[teamId]) {
    response.error(res, STATUS_CODE.FORBIDDEN);
    return;
  }
  if (allowed & req.user.permissions[teamId][section]) {
    next();
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

// eslint-disable-next-line max-len
const permitTeamAllowedTeam = (section, ...allowedPermissions) => (req, res, next) => byToken(req, res, () => {
  const allowed = encodePermissions(...allowedPermissions);

  if (req.user.isFull) {
    next();
    return;
  }
  const allowedForTeams = Object.keys(req.user.permissions).reduce((result, key) => {
    const permissions = req.user.permissions[key];
    if (!permissions) {
      return result;
    }

    if (permissions[section] & allowed) {
      result.push(key);
    }
    return result;
  }, []);

  if (allowedForTeams.length) {
    req.allowedForTeams = allowedForTeams;
    next();
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

const permitAnyGroupTeam = (...sections) => (req, res, next) => byToken(req, res, () => {
  const params = getParams(req);
  const teamId = params.team || params.teamId || params.id;
  if (req.user.isFull) {
    next();
    return;
  }
  let allowed = false;

  sections.forEach((section) => {
    if (req.user.permissions[teamId][section] > 0) {
      allowed = true;
    }
  });
  if (allowed) {
    next();
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

const permitAnyGroupAnyTeam = (...sections) => (req, res, next) => byToken(req, res, () => {
  // const teamId = params.team || params.teamId || params.id;
  if (req.user.isFull) {
    next();
    return;
  }
  const allowedForTeams = Object.keys(req.user.permissions).reduce((result, key) => {
    const permissions = req.user.permissions[key];
    if (!permissions) {
      return result;
    }

    let allowed = false;
    sections.forEach((section) => {
      if (permissions[section] > 0) {
        allowed = true;
      }
    });
    if (allowed) {
      result.push(key);
    }
    return result;
  }, []);

  if (allowedForTeams.length) {
    req.allowedForTeams = allowedForTeams;
    next();
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

const permitAnyGroup = (...sections) => (req, res, next) => byToken(req, res, () => {
  if (req.user.isFull) {
    next();
    return;
  }
  let allowed = false;
  sections.forEach((section) => {
    if (req.user.permissions[section] > 0) {
      allowed = true;
    }
  });

  if (allowed) {
    next();
    return;
  }
  response.error(res, STATUS_CODE.FORBIDDEN);
});

const permitExcept = (...allowedPermissions) => (req, res, next) => byToken(req, res, () => {
  const allowed = encodePermissions(allowedPermissions);
  if (allowed & req.user.permissions) {
    response.error(res, STATUS_CODE.FORBIDDEN);
    return;
  }
  next();
});


const getVerificationCode = () => '124';

const allowLocalCommunication = (req, res, next) => {
  if (!req.query.localToken) {
    return byToken(req, res, next);
  }
  if (req.query.localToken === LOCAL_TOKEN) {
    next();
  } else {
    response.error(res, STATUS_CODE.FORBIDDEN);
  }
};


module.exports = {
  byToken,
  allowLocalCommunication,
  permit,
  permitTeam,
  permitAnyGroup,
  permitExcept,
  permitAnyGroupAnyTeam,
  getVerificationCode,
  permitTeamAllowedTeam,
  permitAnyGroupTeam,
};
