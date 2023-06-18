const { Employee } = require('../src/models');


// const POSITIONS = [
//   {
//     id: 8,
//     value: 'Intern Developer',
//   },
//   {
//     id: 21,
//     value: 'Intern Education Department',
//   },
//   {
//     id: 14,
//     value: 'Full stack developer',
//   },
//   {
//     id: 12,
//     value: 'Backend developer',
//   },
//   {
//     id: 13,
//     value: 'Frontend developer',
//   },
//   {
//     id: 2,
//     value: 'Financier',
//   },
//   {
//     id: 5,
//     value: 'Copywriter',
//   },
//   {
//     id: 3,
//     value: 'Designer',
//   },
//   {
//     id: 4,
//     value: 'Team Lead',
//   },
//   {
//     id: 6,
//     value: 'QA engineer',
//   },
//   {
//     id: 7,
//     value: 'Marketer',
//   },
//   {
//     id: 9,
//     value: 'Senior Backend developer',
//   },
//   {
//     id: 10,
//     value: 'Senior Frontend developer',
//   },
//   {
//     id: 11,
//     value: 'Senior Full stack developer',
//   },
//   {
//     id: 15,
//     value: 'English teacher',
//   },
//   {
//     id: 23,
//     value: 'HR Manager',
//   },
//   {
//     id: 16,
//     value: 'Project Manager',
//   },
//   {
//     id: 17,
//     value: 'Head of HR department',
//   },
//   {
//     id: 19,
//     value: 'Sales manager',
//   },
//   {
//     id: 20,
//     value: 'Head of sales department',
//   },
//   {
//     id: 22,
//     value: 'Прочее',
//   },
// ];

const POSITIONS_MAP = {
  8: 'intern',
  21: 'intern_ed',
  14: 'developer',
  12: 'developer',
  13: 'developer',
  2: 'financier',
  5: 'copywriter',
  3: 'designer',
  4: 'team_lead',
  6: 'qa',
  7: 'marketer',
  9: 'developer',
  10: 'developer',
  11: 'developer',
  15: 'english_teacher',
  23: 'hr',
  16: 'pm',
  17: 'hd',
  19: 'sales',
  20: 'sales_hd',
  22: 'other',
};


// const NEW_POSITIONS = [
//   {
//     id: 'intern',
//     value: 'Стажер',
//   },
//   {
//     id: 'intern_ed',
//     value: 'Ученик ЦО',
//   },
//   {
//     id: 'developer',
//     value: 'Разработчик',
//   },
//   {
//     id: 'financier',
//     value: 'Финансы',
//   },
//   {
//     id: 'copywriter',
//     value: 'Копирайтер',
//   },
//   {
//     id: 'designer',
//     value: 'Дизайнер',
//   },
//   {
//     id: 'team_lead',
//     value: 'Тим Лид',
//   },
//   {
//     id: 'qa',
//     value: 'Тестировщик',
//   },
//   {
//     id: 'marketer',
//     value: 'Маркетолог',
//   },
//   {
//     id: 'english_teacher',
//     value: 'Учитель английского',
//   },
//   {
//     id: 'hr',
//     value: 'HR Manager',
//   },
//   {
//     id: 'pm',
//     value: 'Менеджер проектов',
//   },
//   {
//     id: 'hd',
//     value: 'Глава отдела',
//   },
// { id: 'recruiter', value: 'Рекрутек' },
// { id: 'kadrovik', value: 'Кадровик' },
//   { id: 'sales', value: 'Sales manager' },
//   { id: 'sales_hd', value: 'Глава отдела продаж' },
//   { id: 'tech_lead', value: 'Тех лид' },
//   { id: 'mentor', value: 'Наставник' },
//   { id: 'ho', value: 'Директор офиса' },
//   { id: 'ceo', value: 'Гениральный директор' },
//   { id: 'cto', value: 'Технический директор' },
//   { id: 'coo', value: 'Операционный директор' },
//   { id: 'other', value: 'Прочее' },
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
      if (item.old_position) {
        item.position = POSITIONS_MAP[item.old_position];
      }
      if (!item.old_position) {
        item.old_position = item.position;
        item.position = POSITIONS_MAP[item.position];
      }
      await item.save();
    }
  } catch (e) {
    console.trace(e);
  }
  console.log('SCRIPT', 'END');
}


require('./init')(SCRIPT);
