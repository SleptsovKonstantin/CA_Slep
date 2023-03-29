const encodePermissions = (...PERMISSIONS_BITS) => {
  let result = null;
  PERMISSIONS_BITS.forEach((Permission) => {
    result |= Permission;
  });
  return result;
};

const decodePermissions = (permissions, permissionsMap) => {
  const UserPermissions = {};
  Object.keys(permissionsMap).forEach((key) => {
    if (permissions & permissionsMap[key]) {
      UserPermissions[key] = true;
    }
  });
  return UserPermissions;
};

module.exports = {
  encodePermissions,
  decodePermissions,
};
