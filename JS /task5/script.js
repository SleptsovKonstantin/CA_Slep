const validateForm = () => {
  let namePerson = document.forms[0]["namePerson"].value;
  let emailPerson = document.forms[0]["emailPerson"].value;
  let password = document.forms[0]["password"].value;
  let repeatPassword = document.forms[0]["repeat-password"].value;

  const forbiddenSymbols = ['!',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '|',
    '\\',
    ':',
    ';',
    '"',
    '\'',
    '<',
    '>',
    ',',
    '.',
    '/',
    '?'
  ];

  if (forbiddenSymbols.some(symbol => namePerson.includes(symbol)) || forbiddenSymbols.some(symbol => emailPerson.includes(symbol))) {
    alert('Имя и email не должны содержать запрещенные символы.');
    return false;
  } else if (password.trim() !== repeatPassword.trim()) {
    console.log(password.trim() !== repeatPassword.trim());
    alert('Пароли не совпадают');
    return false;
  }
  return true;
}