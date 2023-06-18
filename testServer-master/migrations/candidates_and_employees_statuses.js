
const {
  Employee,
  Candidate,
} = require('../src/models');
//
// const CANDIDATE_STATUSES_OLD = {
//   1: 'Первый контакт',
//   2: 'Написать позже',
//   3: 'Не писать',
//   5: 'Не пришел на собеседование',
//   6: 'Собеседование 1',
//   7: 'Собеседование 2',
//   8: 'Не прошел собеседование',
//   4: 'Принят на работу',
//   9: 'Отклонил оффер',
//   10: 'Выбыл',
//   11: 'Сотрудник',
// };

const CANDIDATE_STATUSES_MAP = {
  4: 20,
  10: 40,
  11: 30,
};

//
// const EMPLOYEE_STATUSES = [
//   { id: 10, value: 'Обучение' },
//   { id: 20, value: 'Стажировка' },
//   { id: 30, value: 'Сотрудник' },
//   { id: 40, value: 'Уволен' },
//   { id: 50, value: 'Уволился' },
//   { id: 60, value: 'Можем позвать' },
// ];
//
// const CANDIDATE_STATUSES = [
//   { id: 1, value: 'Первый контакт' },
//   { id: 2, value: 'Написать позже' },
//   { id: 3, value: 'Не писать' },
//   { id: 5, value: 'Не пришел на собеседование' },
//   { id: 6, value: 'Собеседование 1' },
//   { id: 7, value: 'Собеседование 2' },
//   { id: 8, value: 'Не прошел собеседование' },
//   { id: 9, value: 'Отклонил оффер' },
//   ...EMPLOYEE_STATUSES,
// ];


async function SCRIPT() {
  console.log('SCRIPT', 'start', Employee);
  try {
    const employee = await Employee.find({});
    console.log('[ TOTAL EMPLOYEES ]', employee.length);
    let count = 1;
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of employee) {
      console.log('[ EMPLOYEE ITERATION ]', count++);
      if (item.status > 0) {
        item.status *= 10;
        await item.save();
      }
    }
    const candidates = await Candidate.find({ result: { $in: [4, 10, 11] } });
    console.log('[ TOTAL CANDIDATES ]', employee.length);
    count = 0;
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of candidates) {
      console.log('[ CANDIDATE ITERATION ]', count++);
      if (CANDIDATE_STATUSES_MAP[item.result]) {
        item.result = CANDIDATE_STATUSES_MAP[item.result];
        await item.save();
      }
    }
  } catch (e) {
    console.trace(e);
  }
  console.log('SCRIPT', 'END');
}


require('./init')(SCRIPT);
