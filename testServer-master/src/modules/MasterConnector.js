
const http = require('http');
const FAKE_DATA = require('../../config/fakeResponces');

const isFakeAuth = process.env.FAKE_AUTH === 'true' || false;
console.log('LOOOG', isFakeAuth);
const options = {
  host: process.env.MASTER_HOST,
  port: process.env.MASTER_PORT,
};
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;

const respHandler = (res) => (result) => {
  // Do stuff with response
  res.statusCode = result.statusCode;
  res.statusMessage = result.statusMessage;

  res.set(result.headers);
  let body = '';
  result.on('data', (chunk) => {
    body += chunk;
  });
  result.on('error', (data) => {
    console.log('error', data);
    res.end();
  });
  result.on('end', () => {
    res.write(body);
    res.end();
  });
};

const respLocal = (cb) => (result) => {
  let body = '';
  result.on('data', (chunk) => {
    body += chunk;
  });
  result.on('error', (data) => {
    console.log('error', data);
  });
  result.on('end', () => {
    cb(body);
  });
};


const get = (req, res) => {
  console.log('LOOG', isFakeAuth);
  if (isFakeAuth) {
    res.send(FAKE_DATA[req.baseUrl + req.path]);
    return;
  }
  http.get({
    ...options,
    headers: req.headers,
    path: req.baseUrl + req.path,
  }, respHandler(res)).on('error', (error) => {
    console.error(error);
  });
};

const getPromise = (url, req) => new Promise((resolve, reject) => {
  const optionsLoc = {
    ...options,
    path: url,
    method: 'GET',
    headers: req.headers,
  };
  http.get(optionsLoc, respLocal((result) => {
    try {
      resolve(JSON.parse(result));
    } catch (e) {
      resolve(result);
    }
  })).on('error', (error) => {
    reject(error);
  });
});


const proxy = (req, res) => {
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


const checkToken = (token) => new Promise((resolve, reject) => {
  if (isFakeAuth) {
    resolve(FAKE_DATA['/api/auth/check']);
    return;
  }
  const optionsLoc = {
    ...options,
    path: '/api/auth/check',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': 0,
      Authorization: `Bearer ${token}`,
    },
  };

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
});

module.exports = {
  proxy, checkToken, get, getPromise,
};
