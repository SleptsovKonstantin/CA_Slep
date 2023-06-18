const vkDomain = 'https://vk.com/';

function getToken() {
  let url = window.location.toString();
  let token = getTokenFromUrl(url);
  if (!token) {
    return null;
  }
  let vkId = getIdFromUrl(url);
  validateToken(token)
      .then((_token) => {
        chrome.runtime.sendMessage({
          action: "tokenFromUrl",
          source: {
            token: _token,
            vkId: vkId,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        chrome.runtime.sendMessage({
          action: "tokenFromUrl",
          source: {
            token: token,
            vkId: vkId,
          },
        });
      })
}

function getIdFromUrl(userId) {
  if (userId && userId.search('user_id=') > -1) {
    return userId.split('user_id=')[1];
  } else {
    return null;
  }
}

function getTokenFromUrl(url) {
  if (url && url.indexOf('access_token') > -1) {
    let parsed = url.match(/access_token=\w+/);
    return parsed && parsed[0] && parsed[0].replace('access_token=', '') || false;
  }
}

function validateToken(token) {
  let error = 'Another error.'
  let invalidTokens = ['undefined', 'true', 'null', 'NaN'];

  return new Promise((resolve, reject) => {
    if (!token) {
      error = 'User token is required.';
      return reject(error);
    } else if (!/^[A-Za-z0-9]+$/.test(token)) {
      error = 'User token should be a valid string [A-Za-z0-9].';
      return reject(error);
    } else if (invalidTokens.indexOf(String(token)) > -1) {
      error = 'User token is invalid.';
      return reject(error);
    } else {
      return resolve(token);
    }
  });
};

getToken();