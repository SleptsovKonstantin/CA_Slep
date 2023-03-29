
module.exports = {
  '/api/auth/login': {
    data: {
      accessInfo: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFhMmU0MzRiYjIxZThhZTllYTU5YjMiLCJ0ZWFtIjoiNWZkODk3N2FlYzI5MGNhY2U3NmRjMDhkIiwiZnVsbE5hbWUiOiJUZXN0ICBEZXNpZ24iLCJzZXNzaW9uSWQiOjAuNDIyOTg0ODQ0MzYyMTY4OSwicGVybWlzc2lvbnMiOnsiRlVMTCI6MCwiRk0iOjAsIkJBIjowLCJUIjowLCJTVEFGRiI6MCwiUiI6OSwiQU4iOjB9LCJtYW5hZ2VkVGVhbXMiOm51bGwsImFsbG93ZWRBY2NvdW50cyI6W10sImlhdCI6MTYzMDUwMTE2MiwiZXhwIjoxNjMwNTAyMDYyfQ.P0h5ASafhU4hDA3yBOOoa94wA2jyulXOHr1W-fDVaio',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFhMmU0MzRiYjIxZThhZTllYTU5YjMiLCJ0ZWFtIjoiNWZkODk3N2FlYzI5MGNhY2U3NmRjMDhkIiwiZnVsbE5hbWUiOiJUZXN0ICBEZXNpZ24iLCJzZXNzaW9uSWQiOjAuNDIyOTg0ODQ0MzYyMTY4OSwicGVybWlzc2lvbnMiOnsiRlVMTCI6MCwiRk0iOjAsIkJBIjowLCJUIjowLCJTVEFGRiI6MCwiUiI6OSwiQU4iOjB9LCJtYW5hZ2VkVGVhbXMiOm51bGwsImFsbG93ZWRBY2NvdW50cyI6W10sImlhdCI6MTYzMDUwMTE2MiwiZXhwIjoxNjMwODYxMTYyfQ.ODhiXOlH3_kvGoLNZpNbtaoZtGJQ1mbdsiR3vN00N7w',
      },
      user: {
        _id: '611a2e434bb21e8ae9ea59b3',
        permissions: {
          GLOBAL: 31,
          FULL: 0,
          FM: 0,
          BA: 0,
          T: 0,
          STAFF: 0,
          R: 9,
          AN: 0,
        },
        team: '5fd8977aec290cace76dc08d',
        fullName: 'Test  Design',
        allowedAccounts: [],
        managedTeams: null,
      },
    },
    shouldNotify: false,
  },
  '/api/auth/logout': { data: { message: 'Success' }, shouldNotify: false },
  '/api/users/hr': {
    data: [{
      _id: '5fd7b5318b300e9aedcd31c9',
      email: 'Admin',
      fullName: 'Admin  ',
    }, {
      _id: '5fd8979dec290cace76dc09a',
      email: 'paulpetrash0@gmail.com',
      team: '5fd8977aec290cace76dc08d',
      fullName: 'Павел Петраш',
    }, {
      _id: '5fd89b3ec4f3fcae03a8346d',
      email: 'igor@exceed-team.com',
      fullName: 'Игорь Тетеревлев',
      team: '5fdce9aa442b5eef692ebad7',
    }, {
      _id: '5fd8cbf5c8ef66b0cfa17716',
      email: 'alex.kucheryavenko.exceed@gmail.com',
      team: '5fd8cbcac8ef66b0cfa17709',
      fullName: 'Александр Кучерявенко',
    }, {
      _id: '5fd8cd9dc8ef66b0cfa1772e',
      email: 'tima1702@gmail.com',
      team: '5fd8cc35c8ef66b0cfa17721',
      fullName: 'Тимофей Кузнецов',
    }, {
      _id: '5fd9b824c8ef66b0cfa17808',
      email: 'daria.prit.o@gmail.com',
      fullName: 'Дарья  ',
      team: '5fdce9aa442b5eef692ebad7',
    }, {
      _id: '5fd9fa88c8ef66b0cfa178c1',
      email: 'pichugina.exceedteam@gmail.com',
      team: '5fd8977aec290cace76dc08d',
      fullName: 'Юля HR Пичугина',
    }, {
      _id: '5fdb748eb356a2dbee83ad0c',
      email: 'nikita.zotsik@gmail.com',
      fullName: 'Никита  Зоцик',
    }, {
      _id: '5fdb755ab356a2dbee83ad13',
      email: 'djekwork@gmail.com',
      fullName: 'Евгений  Богданов',
    }, {
      _id: '5fdcea6f442b5eef692ebae8',
      email: 'nik.iva.andr@gmail.com',
      fullName: 'Никита Иванов',
      team: '5fdce9aa442b5eef692ebad7',
    }, {
      _id: '5fdceb9f442b5eef692ebaef',
      email: 'nik.lazarev.work@gmail.com',
      fullName: 'Никита Лазарев',
      team: '5fdcef4d442b5eef692ebb10',
    }, {
      _id: '5fe2054a215a3e46ec7adf07',
      email: 'roruslanvl@gmail.com',
      fullName: 'Руслан Романенко',
      team: '5fdce9aa442b5eef692ebad7',
    }, {
      _id: '60054e6c517e4f9ef2ab19c5',
      email: 'semen@exceed-team.com',
      team: '5fdbc21fb356a2dbee83ad82',
      fullName: 'Семен Пухов',
    }, {
      _id: '600a8dbe5c939255ac281b4b',
      email: 'arina.fyodorova.2017@mail.ru',
      fullName: 'Арина Федорова',
      team: '5fd8cbcac8ef66b0cfa17709',
    }, {
      _id: '600a8e4c5c939255ac281b51',
      email: 'alanskaya.exceedteam@gmail.com',
      team: '5fd8cc35c8ef66b0cfa17721',
      fullName: 'Александра Ланская  ',
    }, {
      _id: '600a919c5c939255ac281b70',
      email: 'bondareva.exceedteam@gmail.com',
      team: '5fd9ce29c8ef66b0cfa17867',
      fullName: 'Любовь Бондарева',
    }, {
      _id: '600a91d15c939255ac281b75',
      email: 'a.arutyunova.exceedteam@gmail.com',
      team: '5fdbc313b356a2dbee83ada1',
      fullName: 'Ангелина Арутюнова',
    }, {
      _id: '600a923b5c939255ac281b7a',
      email: 'evarlamova.exceedteam@gmail.com',
      team: '5fdbc184b356a2dbee83ad6b',
      fullName: 'Елизавета Варламова',
    }, {
      _id: '600a928d5c939255ac281b7f',
      email: 'verashcheglova8@gmail.com',
      team: '5fdbc2b3b356a2dbee83ad8f',
      fullName: 'Вера Тихонова',
    }, {
      _id: '600aa8b85c939255ac281b8c',
      email: 'alexia_96@mail.ru',
      team: '5fdbc396b356a2dbee83adb8',
      fullName: 'Александра Ланская',
    }, {
      _id: '600aa8e85c939255ac281b91',
      email: 'cheshiri@icloud.com',
      team: '5fdbc21fb356a2dbee83ad82',
      fullName: 'Александра Ланская',
    }, {
      _id: '600aad805c939255ac281b97',
      email: 'varlamova9981@gmail.com',
      team: '5fdcef4d442b5eef692ebb10',
      fullName: 'Елизавета Варламова',
    }, {
      _id: '600ffcb11de000baa1542ae5',
      email: 'artem.luganko.exceed@gmail.com',
      fullName: 'Артем Луганько  ',
      team: '5fdbc1e0b356a2dbee83ad77',
    }, {
      _id: '6013fd0f587519062068f55e',
      email: 'm.turkia.exceedteam@gmail.com',
      team: '5fe62c1fac8fa7922543db15',
      fullName: 'Mariam Turkia',
    }, {
      _id: '6013fd6e587519062068f563',
      email: 'mt.websmart@gmail.com',
      fullName: 'Mariam Turkia',
      team: '6013ce0e587519062068f24f',
    }, {
      _id: '601411e66100116d8739f81c',
      email: 'pofofwar@gmail.com',
      team: '5fdbc2b3b356a2dbee83ad8f',
      fullName: 'Никита Тихонов',
    }, {
      _id: '6014125b6100116d8739f821',
      email: 'lostinsidemybed@gmail.com',
      team: '6013ce0e587519062068f24f',
      fullName: 'Роман  Пулич',
    }, {
      _id: '601419bd6100116d8739f875',
      email: 'i.minyukov.exceed@gmail.com',
      team: '5fe62c1fac8fa7922543db15',
      fullName: 'Иван Минюков  ',
    }, {
      _id: '60179fbc3bd96d72ce9c0a7a',
      email: 'evgeniyastrelnikova.exceedteam4@gmail.com',
      fullName: 'Евгения Стрельникова',
      team: '5fd8cbcac8ef66b0cfa17709',
    }, {
      _id: '601d4a39ec10704e808555b5',
      email: 'miktor.ko@gmail.com',
      team: '5fdbc184b356a2dbee83ad6b',
      fullName: 'Дмитрий Кочерга',
    }, {
      _id: '603617a57a0d822b5f2a8e2e',
      email: 'storchilova.exceedteam@gmail.com',
      team: '5fd8977aec290cace76dc08d',
      fullName: 'Лилиана  Сторчилова',
    }, {
      _id: '60545c0a05e6d49dca52fa77',
      email: 'paulpetrash1@gmail.com',
      team: '5fd8977aec290cace76dc08d',
      fullName: 'Аслан  Нехай',
    }, {
      _id: '608bd0efc382ce0ff5f33783',
      email: 'n.grinko.exceedteam@gmail.com',
      team: '5fdbc313b356a2dbee83ada1',
      fullName: 'Наталья  Гринько',
    }, {
      _id: '611a2e434bb21e8ae9ea59b3',
      email: 'test@design.com',
      team: '5fd8977aec290cace76dc08d',
      fullName: 'Test  Design',
    }, {
      _id: '6123ace798de87af7e43cf8d',
      email: 'minakhmetova.exceedteam@gmail.com',
      team: '5fdbc2b3b356a2dbee83ad8f',
      fullName: 'HR  Minakhmetova',
    }, {
      _id: '6123ad6098de87af7e43cfa4',
      email: 'dimidova.exceedteam@gmail.com',
      team: '611b93b54bb21e8ae9ea5e12',
      fullName: 'HR  Dimidova',
    }, {
      _id: '6123adc298de87af7e43cfaf',
      email: 'gulinskaya.exceedteam@gmail.com',
      team: '5fd8cc35c8ef66b0cfa17721',
      fullName: 'HR  Gulinskaya',
    }, {
      _id: '612cded498de87af7e43ec47',
      email: 'amirami.exceedteam@gmail.com',
      team: '612cde2c98de87af7e43ec37',
      fullName: 'Anastasiya  Marami',
    }, {
      _id: '613731dd98de87af7e44085b',
      email: 'dlazarev.exceedteam@gmail.com',
      team: '5fdbc313b356a2dbee83ada1',
      fullName: 'Данил  Лазарев',
    }, {
      _id: '61544d0874cb4ad694d0c4cf',
      email: 'mrsanufrieva@gmail.com',
      fullName: 'Марина  Ануфриева',
      team: '5fdce9aa442b5eef692ebad7',
    }, {
      _id: '6164039e220f21647a0ba2c3',
      email: 'topoleva.exceedteam@gmail.com',
      team: '5fdbc2b3b356a2dbee83ad8f',
      fullName: 'Алина  Тополева',
    }, {
      _id: '6167ed0032653b4d249e5869',
      email: 'lisochenko.exceedteam@gmail.com',
      team: '5fdce9aa442b5eef692ebad7',
      fullName: 'HR Lisochenko',
    }, {
      _id: '6167ed3932653b4d249e586c',
      email: 'arklimenko.exceedteam@gmail.com',
      team: '5fdce9aa442b5eef692ebad7',
      fullName: 'HR arklimenko',
    }],
    shouldNotify: false,
  },
  '/api/auth/check': {
    _id: '611a2e434bb21e8ae9ea59b3',
    fullName: 'Test  Design',
    sessionId: 0.16264678810297695,
    permissions: {
      FULL: 0,
      FM: 0,
      BA: 0,
      T: 0,
      STAFF: 0,
      R: 9,
      AN: 0,
    },
    managedTeams: null,
    allowedAccounts: [],
    iat: 1630505163,
    exp: 1630505193,
    isFull: true,
  },
  '/api/auth/refresh': {
    data: {
      accessInfo: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFhMmU0MzRiYjIxZThhZTllYTU5YjMiLCJ0ZWFtIjoiNWZkODk3N2FlYzI5MGNhY2U3NmRjMDhkIiwiZnVsbE5hbWUiOiJUZXN0ICBEZXNpZ24iLCJzZXNzaW9uSWQiOjAuNDIyOTg0ODQ0MzYyMTY4OSwicGVybWlzc2lvbnMiOnsiRlVMTCI6MCwiRk0iOjAsIkJBIjowLCJUIjowLCJTVEFGRiI6MCwiUiI6OSwiQU4iOjB9LCJtYW5hZ2VkVGVhbXMiOm51bGwsImFsbG93ZWRBY2NvdW50cyI6W10sImlhdCI6MTYzMDUwMTE2MiwiZXhwIjoxNjMwNTAyMDYyfQ.P0h5ASafhU4hDA3yBOOoa94wA2jyulXOHr1W-fDVaio',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFhMmU0MzRiYjIxZThhZTllYTU5YjMiLCJ0ZWFtIjoiNWZkODk3N2FlYzI5MGNhY2U3NmRjMDhkIiwiZnVsbE5hbWUiOiJUZXN0ICBEZXNpZ24iLCJzZXNzaW9uSWQiOjAuNDIyOTg0ODQ0MzYyMTY4OSwicGVybWlzc2lvbnMiOnsiRlVMTCI6MCwiRk0iOjAsIkJBIjowLCJUIjowLCJTVEFGRiI6MCwiUiI6OSwiQU4iOjB9LCJtYW5hZ2VkVGVhbXMiOm51bGwsImFsbG93ZWRBY2NvdW50cyI6W10sImlhdCI6MTYzMDUwMTE2MiwiZXhwIjoxNjMwODYxMTYyfQ.ODhiXOlH3_kvGoLNZpNbtaoZtGJQ1mbdsiR3vN00N7w',
      },
      user: {
        _id: '611a2e434bb21e8ae9ea59b3',
        permissions: {
          FULL: 0,
          FM: 0,
          BA: 0,
          T: 0,
          STAFF: 0,
          R: 9,
          AN: 0,
        },
        team: '5fd8977aec290cace76dc08d',
        fullName: 'Test  Design',
        allowedAccounts: [],
        managedTeams: null,
      },
    },
    shouldNotify: false,
  },
  '/api/teams/hr': {
    data: [{
      _id: '5fd897721229023ce76dc087',
      name: 'Design Mkp',
      city: 'Майкоп',
      address: 'Юннатов 9Г',
      __v: 0,
    }, {
      _id: '5fd8c11118ef66b011117709',
      name: 'Design Tgn',
      city: 'Таганрог',
      address: 'Александровская 85/2',
      __v: 0,
    }, {
      _id: '5fd82335c8e466b0cfa17721',
      name: 'Nov-k',
      city: 'Новочеркасск',
      address: 'Дубовского, 15',
      __v: 0,
    }, {
      _id: '5fd9c2918ef66b0cfa17867',
      name: 'Shah',
      city: 'Шахты',
      address: 'проезд Микрорайон Горняк 3',
      __v: 0,
    }, {
      _id: '611493b545621e8ae9ea5e12',
      name: ' Ptg',
      city: 'Пятигорск',
      address: 'Пятигорск',
      __v: 0,
    }, {
      _id: '612cde2c98de87af7e43ec37',
      name: 'Rnd',
      city: 'Ростов',
      address: 'проспект Соколова, 72',
      __v: 0,
    }],
    shouldNotify: false,
  },

};
