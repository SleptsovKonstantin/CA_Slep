const GENDERS = [
  { id: 'М', value: 'М' },
  {
    id: 'Ж',
    value: 'Ж',
  },
];

const POSITIONS = [
  {
    id: 'intern',
    value: 'Стажер',
  },
  {
    id: 'intern_ed',
    value: 'Ученик ЦО',
  },
  {
    id: 'developer',
    value: 'Разработчик',
  },
  {
    id: 'junior_developer',
    value: 'Junior Разработчик',
  },
  {
    id: 'middle_developer',
    value: 'Middle Разработчик',
  },
  {
    id: 'financier',
    value: 'Финансы',
  },
  {
    id: 'copywriter',
    value: 'Копирайтер',
  },
  {
    id: 'designer',
    value: 'Дизайнер',
  },
  {
    id: 'team_lead',
    value: 'Тим Лид',
  },
  {
    id: 'qa',
    value: 'Тестировщик',
  },
  {
    id: 'marketer',
    value: 'Маркетолог',
  },
  {
    id: 'english_teacher',
    value: 'Учитель английского',
  },
  {
    id: 'hr',
    value: 'HR Manager',
  },
  {
    id: 'pm',
    value: 'Менеджер проектов',
  },
  {
    id: 'hd',
    value: 'Глава отдела',
  },
  { id: 'sales', value: 'Sales manager' },
  { id: 'sales_hd', value: 'Глава отдела продаж' },
  { id: 'tech_lead', value: 'Тех лид' },
  { id: 'mentor', value: 'Наставник' },
  { id: 'ed_teacher', value: 'Куратор ЦО' },
  { id: 'ho', value: 'Директор офиса' },
  { id: 'ceo', value: 'Гениральный директор' },
  { id: 'cto', value: 'Технический директор' },
  { id: 'coo', value: 'Операционный директор' },
  { id: 'recruiter', value: 'Рекрутер' },
  { id: 'office_manager', value: 'Офис Менеджер' },
  { id: 'kadrovik', value: 'Кадровик' }, //  \()/
  { id: 'other', value: 'Прочее' },
];
const SEND_RESULT = [
  { id: 1, value: 'еще не сообщили' },
  { id: 2, value: 'в день собеса' },
  { id: 3, value: 'на след день' },
  { id: 4, value: 'через день' },
  { id: 5, value: '2' },
  { id: 6, value: '3' },
  { id: 7, value: '4' },
  { id: 8, value: '5' },
  { id: 9, value: '6' },
  { id: 10, value: '7' },
  { id: 11, value: '8' },
  { id: 12, value: '9' },
  { id: 13, value: '10' },
];

const EMPLOYEE_STATUSES = [
  { id: 10, value: 'Обучение' },
  { id: 20, value: 'Стажировка' },
  { id: 30, value: 'Сотрудник' },
  { id: 40, value: 'Уволен' },
  { id: 50, value: 'Уволился' },
  { id: 60, value: 'Можем позвать' },
];

const CANDIDATE_STATUSES = [
  { id: 1, value: 'Первый контакт' },
  { id: 2, value: 'Написать позже' },
  { id: 3, value: 'Не писать' },
  { id: 5, value: 'Не пришел на собеседование' },
  { id: 6, value: 'Собеседование 1' },
  { id: 7, value: 'Собеседование 2' },
  { id: 8, value: 'Не прошел собеседование' },
  { id: 9, value: 'Отклонил оффер' },
  ...EMPLOYEE_STATUSES,
];

const APPLICAION_POSITIONS = [
  ...POSITIONS,
  { id: 'intern_java', value: 'Стажер Java' },
  { id: 'junior_java', value: 'Junior Java' },
  { id: 'middle_java', value: 'Middle Java' },
  { id: 'intern_python', value: 'Стажер Python' },
  { id: 'junior_python', value: 'Junior Python' },
  { id: 'middle_python', value: 'Middle Python' },
];

const APPLICATION_POSITIONS_INDEXES = APPLICAION_POSITIONS.reduce((res, i) => {
  res[i.id] = i.value;
  return res;
}, {});

const POSITIONS_INDEXES = POSITIONS.reduce((res, i) => {
  res[i.id] = i.value;
  return res;
}, {});


const CANDIDATE_STATUSES_INDEXED = CANDIDATE_STATUSES.reduce((res, i) => {
  res[i.value] = i.id;
  return res;
}, {});

// eslint-disable-next-line camelcase
const CANDIDATE_STATUSES_INDEXED_id = CANDIDATE_STATUSES.reduce((res, i) => {
  res[i.id] = i.value;
  return res;
}, {});

const LEFT_REASON = [
  { id: 2, value: 'Другое предложение в этой области' },
  { id: 3, value: 'Поменял область работы' },
  { id: 4, value: 'ЗП' },
  { id: 5, value: 'Проблемы с руководством' },
  { id: 6, value: 'Не справлялся с задачами' },
];

const CHANNEL = [
  { id: 2, value: 'VK' },
  { id: 3, value: 'HH' },
  { id: 4, value: 'WhatsApp' },
  { id: 5, value: 'Avito' },
  { id: 6, value: 'Друзья друзей' },
];

const LEFT_SUMMARY = [
  { id: 'none', value: '-', color: '#444348FF' },
  { id: 'salary', value: 'Зарплата', color: '#6BF672FF' },
  { id: 'burned', value: 'Выгорание', color: '#72B2F1FF' },
  { id: 'moving', value: 'Переезд', color: '#FFA446FF' },
  { id: 'work_time', value: 'График', color: '#857AF0FF' },
  { id: 'personal_issues', value: 'По личным причинам', color: '#FF467BFF' },
  { id: 'hired_competitors', value: 'Схантили/ушел в другую компанию', color: 'rgb(228, 216, 49)' },
  {
    id: 'relationship_with_team_manager',
    value: 'Отношения с командой/руководителем',
    color: 'rgb(0, 147, 145)',
  },
  { id: 'weak_for_load', value: 'Не тянет нагрузку', color: 'rgb(255, 72, 76)' },
  { id: 'not_developing', value: 'Нет развития', color: 'rgb(118, 236, 227)' },
];

const LEFT_SUMMARY_INDEXES = LEFT_SUMMARY.reduce((res, i) => {
  res[i.id] = i.value;
  return res;
}, {});

module.exports = {
  LEFT_SUMMARY_INDEXES,
  CANDIDATE_STATUSES_INDEXED_id,
  APPLICATION_POSITIONS_INDEXES,
  CANDIDATE_STATUSES,
  CANDIDATE_STATUSES_INDEXED,
  POSITIONS,
  POSITIONS_INDEXES,
  SEND_RESULT,
  GENDERS,
  LEFT_REASON,
  CHANNEL,
};
