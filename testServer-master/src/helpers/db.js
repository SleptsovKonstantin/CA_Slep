
const pullSpecificInfo = (data, populate = []) => {
  if (typeof data !== 'object' || data === null) {
    return null;
  }
  const getPopulatedFields = () => {
    if (!Array.isArray(populate)) {
      populate = [populate];
    }
    populate = populate.map((populateOption) => {
      if (typeof populateOption === 'string') {
        return populateOption;
      }
      return populateOption.path;
    });
    return populate;
  };

  const pullFromObject = (object) => {
    const populatedFields = getPopulatedFields();
    populatedFields.forEach((field) => {
      const specificInfo = object[field];
      delete object[field];
      object = { ...object, ...specificInfo };
    });
    return object;
  };

  if (Array.isArray(data)) {
    return data.map((item) => pullFromObject(item, populate));
  }
  return pullFromObject(data, populate);
};

// TODO think if there is way to use better implementation
module.exports = {
  pullSpecificInfo,
};
