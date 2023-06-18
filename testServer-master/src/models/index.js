const fs = require('fs');

const models = {};
try {
  const files = fs.readdirSync(__dirname);

  files.forEach((modelFile) => {
    if (modelFile !== 'index.js' && modelFile.endsWith('.js')) {
      const model = require(`${__dirname}/${modelFile}`);
      models[model.modelName] = model;
    }
  });
} catch (e) {
  console.log('Walk models ', e);
  process.exit(3);
}

module.exports = models;
