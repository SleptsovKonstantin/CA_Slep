const nameQuery = (like) => {
  if (!like) {
    return {};
  }
  const query = like.split(' ');
  const [name, patronymic, surname] = query;

  const firstReg = new RegExp(name, 'i');
  const secondReg = new RegExp(patronymic, 'i');
  const thirdReg = new RegExp(surname, 'i');

  switch (query.length) {
    case 1:
      return { $or: [{ name: firstReg }, { patronymic: firstReg }, { surname: firstReg }] };
    case 2:
      return {
        $or: [
          { name: firstReg, surname: secondReg },
          { name: secondReg, surname: firstReg },

          { name: firstReg, patronymic: secondReg },
          { name: secondReg, patronymic: firstReg },

          { surname: firstReg, patronymic: secondReg },
          { surname: secondReg, patronymic: firstReg },
        ],
      };
    case 3:
      return {
        $and: [
          { $or: [{ name: firstReg }, { name: secondReg }, { name: thirdReg }] },
          { $or: [{ patronymic: firstReg }, { patronymic: secondReg }, { patronymic: thirdReg }] },
          { $or: [{ surname: firstReg }, { surname: secondReg }, { surname: thirdReg }] },
        ],
      };
    default:
      return {};
  }
};

module.exports = {
  nameQuery,
};
