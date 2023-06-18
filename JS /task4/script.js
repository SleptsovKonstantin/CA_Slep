const validateForm = () => {
  let title = document.forms[0]["title"].value;
  let text = document.forms[0]["text"].value;
  let author = document.forms[0]["author"].value;

  const forbiddenWords = ['let',
    'const',
    'var',
    'function',
    'if',
    'else',
    'switch',
    'case',
    'default',
    'for',
    'while',
    'do',
    'break',
    'continue',
    'return',
    'true',
    'false'];
  const forbiddenSymbols = ['!',
    '@',
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

  if (title.trim() == '' || text.trim() == '' || author.trim() == '') {
    alert('Все поля должны быть заполнены.');
    return false;
  } else if (forbiddenWords.some(word => title.includes(word)) || forbiddenWords.some(word => text.includes(word)) || forbiddenWords.some(word => author.includes(word)) || forbiddenSymbols.some(symbol => title.includes(symbol)) || forbiddenSymbols.some(symbol => text.includes(symbol)) || forbiddenSymbols.some(symbol => author.includes(symbol))) {
    alert('Заголовок и текст не должны содержать запрещенные слова или символы.');
    return false;
  }
  return true;
}