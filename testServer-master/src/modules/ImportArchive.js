const readXlsxFile = require('read-excel-file/node');


const formatDate = (date) => {
  if (!date) {
    return '';
  }
  const formated = new Date(Math.round((date - (25569)) * 86400 * 1000));
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(formated.getTime())) {
    return '';
  }
  return formated.getTime();
};

// 2021-08-12
const formatDateForDateInput = (date) => {
  const nDate = new Date(date);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(nDate.getDate())) {
    return '';
  }
  const month = nDate.getMonth() + 1;
  const day = nDate.getDate();
  return `${nDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};
// export const CANDIDATE_STATUSES = [
// { id: 1, value: 'Первый контакт' },
// { id: 2, value: 'Написать позже' },
// { id: 3, value: 'Не писать' },
// { id: 5, value: 'Не пришел на собеседование' },
// { id: 6, value: 'Собеседование 1' },
// { id: 7, value: 'Собеседование 2' },
// { id: 8, value: 'Не прошел собеседование' },
// { id: 4, value: 'Принят на работу' },
// { id: 9, value: 'Отклонил оффер' },
// { id: 10, value: 'Выбыл' },
// { id: 11, value: 'Сотрудник' },
// ];

const getStatus = {
  null: 1,
  'Не пришел на собес': 5,
  'Не прошел собес': 8,
  'Приглас-принял': 4,
  'Приглас-отказ': 9,
  'Не прошел 2 недели': 10,
  'Не прошел 3 недели': 10,
  'Не прошел 4 недели': 10,
  'Прошел 2 недели': 4,
  'Прошел 3 недели': 4,
  'Прошел 4 недели': 4,
  Сотрудник: 11,
  'Выбыл на фин этапе': 10,

};

const parseCandidateArchive = (path, workGroup) => new Promise((resolve, reject) => {
  const result = [];
  readXlsxFile(path, { sheet: 2 })
    .then((rows, err) => {
      if (err) {
        reject(err);
      }
      let curKey = 0;


      rows.forEach((cols) => {
        if (/^\d+_\d+$/.test(cols[0])) {
          // eslint-disable-next-line prefer-destructuring
          curKey = cols[0].split('_');
          curKey = new Date(`${curKey[0]}/01/${curKey[1]}`);
          return;
        }
        if (!cols[0]) {
          return;
        }
        const fio = cols[0];
        console.log('LOOOG----', cols[1], getStatus[cols[1]]);
        const info = {
          fio,
          result: getStatus[cols[1]],
          createdAt: curKey,
          isAI: true,
          workGroup,
        };
        if (cols[2]) {
          info.interviewDate = formatDateForDateInput(formatDate(cols[2]));
        } else {
          info.interviewDate = formatDateForDateInput(new Date(curKey));
        }

        result.push(info);
      });

      resolve(result);
    });
});

const parseTaganrogCandidateArchive = (path) => new Promise((resolve, reject) => {
  const result = [];
  readXlsxFile(path, { sheet: 1 })
    .then((rows, err) => {
      if (err) {
        reject(err);
      }

      rows.shift();

      // eslint-disable-next-line camelcase
      const not_write = rows.splice(1, 46);

      const formatCandidate = (cols, array, notWrite = false) => {
        if (!cols[0]) {
          return;
        }
        const formated = {};
        // eslint-disable-next-line prefer-destructuring
        formated.fio = cols[0];
        formated.vk = cols[1] && cols[1].includes('https://vk.com') ? cols[1] : '';
        if (notWrite) {
          formated.noWriteAgain = true;
        }

        let date = '';


        // eslint-disable-next-line no-restricted-globals
        if (/^\d+$/.test(cols[2])) {
          date = formatDate(cols[2]);
        } else if (cols[2]) {
          date = cols[2].split('.');
          date = new Date(`${date[1]}-${date[0]}-${date[2]}`);
        }
        formated.interviewDate = formatDateForDateInput(date);
        formated.workGroup = '611cd515368c03034b3d6dd4';
        if (cols[3] && (cols[3].includes('Александр Кучерявенко') || cols[3].includes('Кучерявенко'))) {
          formated.workGroup = '611cd4e4368c03034b3d6dd2';
          formated.team = '5fd8cbcac8ef66b0cfa17709';
        }
        if (cols[3] && (cols[3].includes('Евгений Богданов') || cols[3].includes('Богданов'))) {
          formated.workGroup = '611cd4fe368c03034b3d6dd3';
        }

        formated.comment = `${cols[5]}\n${cols[7]}`;
        formated.result = (cols[4] || '').includes('подходит') ? 7 : 8;
        array.push(formated);
      };

      not_write.forEach((cols) => {
        formatCandidate(cols, result, true);
      });

      rows.forEach((cols) => {
        formatCandidate(cols, result, false);
      });

      resolve(result);
    });
});

const convertPosition = {
  'Full stack developer': 14,
  'HR manager': 23,
  'Sales manager': 19,
  'Intern full stack developer': 8,
};

const parseStaffArchive = (path, workGroup, team) => new Promise((resolve, reject) => {
  const result = [];
  readXlsxFile(path, { sheet: 1 })
    .then((rows, err) => {
      console.log('LOOOG', 'FILE OPENED');
      if (err) {
        reject(err);
      }
      /**
       * 12 - fio
       * 13 - position
       * 14 - intern date
       * 15 - start work date
       *
       *
       * 17 - left fio
       * 18 - left position
       * 19 - intern date
       * 20 - start work date
       * 21 - leftDate
       * 22 - comment
       */

      rows.shift();
      rows.shift();


      rows.forEach((cols) => {
        if (cols[11]) {
          console.log('LOOOG', 'Add emploee');
          result.push({
            fio: cols[11],
            position: cols[12] === 'сотрудник' ? 14 : 8,
            internDate: formatDate(cols[13]),
            startWorkDate: formatDate(cols[14]),
            status: cols[12] === 'сотрудник' ? 3 : 2,
            createdAt: new Date(),
            workGroup,
            team: team || '',
          });
        }
        // * 17 - left fio
        //   * 18 - left position
        //   * 19 - intern date
        //   * 20 - start work date
        //   * 21 - leftDate
        //   * 22 - comment
        if (cols[17]) {
          result.push({
            fio: cols[17],
            position: convertPosition[cols[18]] || 22,
            internDate: formatDate(cols[19]),
            startWorkDate: formatDate(cols[20]),
            leftDate: formatDate(cols[21]),
            status: 4,
            comment: [{
              from: 'AI',
              created: new Date(),
              message: cols[22],
            }],
            createdAt: new Date(),
            workGroup,
          });
        }
      });

      resolve(result);
    });
});

module.exports = {
  parseStaffArchive,
  parseCandidateArchive,
  parseTaganrogCandidateArchive,
};
