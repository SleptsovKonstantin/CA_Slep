const fromJSON = function(item, strict) {
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch (e) {
    return strict ? null : item;
  }
};

const obj_to_query_str = function(obj) {
  const arr = [];
  for (const index in obj) {
    arr.push(`${index}=${obj[index]}`);
  }
  return encodeURI(arr.join('&'));
};

const Storage = {
  set(key, value) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          const obj = {};
          try {
            value = JSON.stringify(value);
          } catch (e) {
            reject && reject(e);
          }
          obj[key] = value;
          chrome.storage.local.set(obj, () => resolve && resolve());
        } catch (e) {
          return reject && reject(e);
        }
      } else {
        return reject && reject();
      }
    });
  },
  get(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          chrome.storage.local.get(key, result => {
            let d = result[key];
            try {
              d = JSON.parse(d);
            } catch (e) {
              reject && reject(e);
            }
            return resolve && resolve(d);
          });
        } catch (e) {
          return reject && reject(e);
        }
      } else {
        return reject && reject();
      }
    });
  },
  clear() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.clear(result => resolve && resolve(result));
      } catch (e) {
        return reject && reject(e);
      }
    });
  },
};

const send = function(method, url, params, ecb, scb, token = false) {
  if (!method || !url) ecb({ error: 'no params' });
  params = params ? JSON.stringify(params) : null;
  method = method.toUpperCase();

  const xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.setRequestHeader('Authorization', `Bearer ${token || Auth.getAccessToken()}`);

  xhr.onreadystatechange = function() {
    const DONE = 4; // readyState 4 means the request is done.
    const OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        return scb(fromJSON(xhr.responseText));
      }

      if (xhr.status === 401 && !token) {
        refreshToken(() => {
          if (typeof params === 'string') {
            params = JSON.parse(params);
          }
          send(method, url, params, ecb, scb);
        }, ecb);
        return;
      }

      return ecb(xhr.status, fromJSON(xhr.responseText));
    }
  };
  xhr.send(params);
};

function refreshToken(next, ecb) {
  // eslint-disable-next-line no-undef
  send(
    'POST',
    `${domain}/auth/refresh`,
    {},
    ecb,
    data => {
      Auth.setAccessInfo(data.data);
      next();
    },
    Auth.getRefreshToken(),
  );
}

const Auth = (() => {
  let at;
  let rt;

  const setAccessInfo = accessInfo => {
    at = accessInfo.access_token;
    rt = accessInfo.refresh_token;
    Storage.set('at', at);
    Storage.set('rt', rt);
  };
  const getAccessToken = () => at;
  const getRefreshToken = () => rt;
  const init = async () => {
    try {
      at = await Storage.get('at');
      rt = await Storage.get('rt');
    } catch (e) {
      console.log('init ', e);
    }
  };

  init();
  return {
    setAccessInfo,
    getAccessToken,
    getRefreshToken,
    init,
  };
})();
