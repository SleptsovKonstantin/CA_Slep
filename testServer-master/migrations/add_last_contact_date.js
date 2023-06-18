
const {
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


const hasNoInterviewDate = [1, 2, 3, 5];

async function SCRIPT() {
  console.log('SCRIPT', 'start');
  try {
    const candidates = await Candidate.find({});
    const count = candidates.length;
    let counter = candidates.length;
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of candidates) {
      console.log('Progress', (count - --counter) / count);
      if (hasNoInterviewDate.includes(item.result) && item.interviewDate) {
        item.lastContactDate = new Date(item.interviewDate);
        item.interviewDate = undefined;
        await item.save();
      } else if (item.interviewDate) {
        item.interviewDate = new Date(item.interviewDate);
        await item.save();
      }
    }
  } catch (e) {
    console.trace(e);
  }
  console.log('SCRIPT', 'END');
}


require('./init')(SCRIPT);
