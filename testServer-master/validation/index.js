const fs = require('fs');

const validators = {};
try {
  const files = fs.readdirSync(__dirname);

  files.forEach((validationFile) => {
    if (validationFile !== 'index.js' && validationFile.endsWith('.js')) {
      validators[validationFile.replace('.js', '')] = require(`${__dirname}/${validationFile}`);
    }
  });
} catch (e) {
  console.log('Walk validations', e);
  process.exit(3);
}

module.exports = validators;
