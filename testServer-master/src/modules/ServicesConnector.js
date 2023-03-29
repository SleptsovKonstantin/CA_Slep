const http = require('http');
const FAKE_DATA = require('../../config/fakeResponces');

const isFakeAuth = process.env.FAKE === 'true' || true;
module.exports = (service) => {
  const options = {
    host: process.env[`${service}_HOST`],
    port: process.env[`${service}_PORT`],
  };
  const keepAliveAgent = new http.Agent({ keepAlive: true });
  options.agent = keepAliveAgent;

  const respHandler = (res) => (result) => {
    // Do stuff with response
    res.statusCode = result.statusCode;
    res.statusMessage = result.statusMessage;
    console.log('LOOOG', 'respHandler');
    res.set(result.headers);
    let body = '';
    result.on('data', (chunk) => {
      body += chunk;
    });
    result.on('error', (data) => {
      console.log('respHandler error', data);
      res.end();
    });
    result.on('end', () => {
      try {
        console.log('respHandler', 'end');
        res.write(body);
        res.end();
      } catch (e) {
        console.log('LOOOG', e);
      }
    });
  };


  const get = (req, res) => {
    if (isFakeAuth) {
      res.send(FAKE_DATA[req.baseUrl + req.path]);
      return;
    }
    http.get({
      ...options,
      headers: req.headers,
      path: req.baseUrl + req._parsedUrl.path,
    }, respHandler(res)).on('error', (error) => {
      console.error(error);
    });
  };


  const proxy = (req, res) => {
    console.log('LOOG - -----', isFakeAuth, req.baseUrl, req.path);
    if (isFakeAuth) {
      res.send(FAKE_DATA[req.baseUrl + req.path]);
      return;
    }
    if (req.method === 'GET') {
      return get(req, res);
    }
    const reqest = http.request({
      ...options,
      path: req.baseUrl + req.path,
      method: req.method,
      headers: req.headers,
    }, respHandler(res)).on('error', (e) => {
      console.log('ERROR ', e);
    });
    if (req.body) {
      reqest.write(JSON.stringify(req.body));
    }
    reqest.end();
  };


  const checkToken = (reqOriginal) => new Promise((resolve, reject) => {
    console.log('checkToken', isFakeAuth);
    if (isFakeAuth) {
      resolve(FAKE_DATA['/api/auth/check']);
      return;
    }
    console.log('LOOOG', reqOriginal.query.at);
    const optionsLoc = {
      ...options,
      path: '/api/auth/check',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': 0,
        Authorization: `${reqOriginal.headers.authorization || reqOriginal.query.at}`,
        cookie: `${reqOriginal.headers.cookie}`,
      },
    };
    try {
      const req = http.request(optionsLoc, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        if (res.statusCode === 401) {
          reject('UNAUTHORIZED');
          return;
        }

        res.on('data', (d) => {
          try {
            const { data } = JSON.parse(d);
            resolve(data);
          } catch (e) {
            console.log('checkToken data', e);
            reject(e);
          }
        });

        res.on('error', (e) => {
          console.log('checkToken error', e);
        });
      });

      req.on('error', (error) => {
        console.error(error);
      });

      req.end();
    } catch (e) {
      console.log('LOOOG', e);
    }
  });

  return { proxy, checkToken, get };
};
