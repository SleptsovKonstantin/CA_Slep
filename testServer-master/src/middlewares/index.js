const fs = require('fs');

const middlewares = {};
try {
  const files = fs.readdirSync(__dirname);

  files.forEach((middlewareFile) => {
    if (middlewareFile !== 'index.js' && middlewareFile.endsWith('.js')) {
      const middleware = require(`${__dirname}/${middlewareFile}`);
      if (typeof middleware === 'function') {
        middlewares[middleware.name] = middleware;
      } else if (typeof middleware === 'object') {
        middlewares[middlewareFile.replace('.js', '')] = middleware;
      }
    }
  });
} catch (e) {
  console.log('Walk middlewares', e);
  process.exit(3);
}

module.exports = middlewares;
