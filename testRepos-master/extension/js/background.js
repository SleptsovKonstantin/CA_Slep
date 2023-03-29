/* eslint-disable consistent-return,no-undef */
const _port = null;
let responseOnWait = null;
const tokenTabId = null;
const SYNC_DELAY = 30 * 1000;
const candidates = {};

let createCandidateCb = () => {};
let workGroup = '';

const styles = {
  container: `    max-width: 300px;
    min-height: 100px;
    min-width: 100px;
    background-color: rgb(0 130 0 / 77%);
    position: fixed;
    top: 50px;
    right: 25px;
    color: white;
    font-size: 14px;
    padding: 15px;
    line-height: 25px;`,
  containerNotFound: `
      max-width: 300px;
      line-height: 25px;
    min-height: 35px;
    padding: 5px;
    font-size: 16px;
    min-width: 100px;
    background-color: rgb(0 16 157 / 77%);
    position: fixed;
    top: 50px;
    right: 25px;
    color: white;
 `,
  noWrite: `    width: 100%;
    text-align: center;
    color: red;
    font-size: 18px;
    background: white;
    display: block;`,
  title: `font-weight: bold;color: white;font-size: 18pt;text-align: center; padding:  '25%'
 10px'`,
};

function test(tab) {
  chrome.tabs.executeScript(tab.id, { file: 'js/getPagesSource.js' }, () => {
    if (chrome.runtime.lastError) {
    }
  });
}
function checkPageAndReturnName(tabID, attempt = 0) {
  if (!tabID) {
    return alert('Something went wrong\nCode: A45');
  }
  const tabId = tabID.tabId || tabID;
  try {
    chrome.tabs.executeScript(tabId, { code: `window.ECRMTABID = ${tabId}` }, () => {
      chrome.tabs.executeScript(tabId, { file: 'js/checkAndGetUserName.js' }, () => {});
    });
  } catch (e) {
    if (attempt < 10) {
      setTimeout(checkPageAndReturnName, 150, tabId, ++attempt);
    }
  }
}

function checkPageAndReturnId(tabID, attempt = 0) {
  const tabId = tabID.tabId || tabID;
  try {
    chrome.tabs.executeScript(tabId, { code: `window.ECRMTABID = ${tabId}` }, () => {
      chrome.tabs.executeScript(tabId, { file: 'js/checkAndGetUserID.js' }, () => {});
    });
  } catch (e) {
    if (attempt < 10) {
      setTimeout(checkPageAndReturnId, 150, tabId, ++attempt);
    }
  }
}
function tryToSendMessage() {
  responseOnWait && _port && _port.postMessage(responseOnWait);
}

function IsAuth(...params) {
  return Storage.get('user');
}

function SignOut() {
  Storage.clear();
}

// todo cache candidate by id or vk nick make caching on api request side
function GetCandidateForTab() {
  return new Promise((resolve, reject) => {
    getCurrentTab((tabId, tab) => {
      if (tabId) {
        resolve(candidates[tab.url]);
      }
    });
  });
}

function CreateCandidateFromCurrentPage(wg, cb) {
  workGroup = wg;
  createCandidateCb = cb;
  getCurrentTab(checkPageAndReturnName);
}

function SetInterviewDate(data) {
  getCurrentTab(tabId => {
    data.tabId = tabId;
    updateInterview(data);
  });
}

function SetCandidateInfo(data) {
  getCurrentTab(tabId => {
    data.tabId = tabId;
    updateCandidate(data);
  });
}

function SignIn(login, pass) {
  return new Promise((resolve, reject) => {
    send(
      'POST',
      `${domain}/auth/login`,
      { email: login, password: pass, rememberMe: true },
      (c, r) => {
        reject(r);
        if (c && c === 204) {
          sendExtensionError(true);
        } else {
          console.log('Connection Error: ', c, r);
          sendExtensionError(false);
        }
      },
      r => {
        const { user } = r.data;
        Auth.setAccessInfo(r.data.accessInfo);
        resolve(user);
        Storage.set('user', user);
      },
    );
  });
}

function clearExtension(tabID) {
  const tabId = tabID.tabId || tabID;
  chrome.tabs.executeScript(
    tabId,
    { code: "try{document.body.removeChild(document.getElementById('kvadratic'))}catch(e){}" },
    () => {
      if (chrome.runtime.lastError) {
      }
    },
  );
}

function showUserNotFoundMessages(tabId) {
  tabId = tabId.tabId || tabId;
  const content = '<span>Собеседований не назначено</span>';

  const code = `var container = document.createElement('div');
      container.setAttribute('id','kvadratic')
      container.style = \`${`${styles.containerNotFound}`}\`;
      document.querySelector('body').appendChild(container);
      container.innerHTML = \`${content}\``;

  try {
    chrome.tabs.executeScript(tabId, { code }, e => {
      console.log('err ', e);
    });
  } catch (e) {
    console.log('showUserNotFoundMessages', tabId, code);
  }
}

function formatDate(date) {
  let time = new Date(date);
  time = isNaN(time.getDay())
    ? '--'
    : `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  return time;
}

function showUserMessages(info, _tabId) {
  if (!info) {
    return;
  }
  const tabId = _tabId && _tabId.tabId ? _tabId.tabId : _tabId.id || _tabId;

  const time = formatDate(info.interviewDate);

  let content = `<h2 style="${styles.title}">Кандидат</h2>`;
  const str = `<b>Собеседование: </b><span>${time}</span><br/>`;
  if (!info.noWriteAgain) {
    content += str;
  }

  if (info.noWriteAgain) {
    content += `<b style="${styles.noWrite}">НЕ ПИСАТЬ</b><br/>`;
  }
  if (info.mayWriteAfter && !info.noWriteAgain) {
    content += `<b>Писать после: </b><span>${formatDate(info.mayWriteAfter)}</span><br/>`;
  }

  const code = `var container = document.createElement('div');
      container.setAttribute('id','kvadratic')
      container.style = \`${styles.container}\`;
      document.querySelector('body').appendChild(container);
      container.innerHTML = \`${content}\``;

  tabId && chrome.tabs.executeScript(tabId, { code }, () => {});
}

function sendExtensionError(wasChecked) {
  responseOnWait = wasChecked ? 'Not in DB' : 'Error';
  tryToSendMessage();
}

function getWorkGroups(cb) {
  send(
    'GET',
    `${domain}/work-groups`,
    {},
    (c, r) => {
      if (c && c === 204) {
        sendExtensionError(true);
      } else {
        // eslint-disable-next-line no-console
        console.log('Connection Error: ', c, r);
        if (c === 401) {
          Storage.clear();
        }
        sendExtensionError(false);
      }
    },
    r => {
      Storage.get('workGroup')
        .then(group => {
          cb(r.data, group);
        })
        .catch(e => {
          cb(r.data, null);
          console.log(e);
        });
    },
  );
}

function setWorkGroup(id) {
  Storage.set('workGroup', id);
}

function checkDialogWithUser(data) {
  const now = new Date().getTime();
  const hasCandidateForTab = candidates[data.withId] && candidates[data.withId].syncAt;
  // TODO uses requiests links as key for search candidate
  if (hasCandidateForTab - now < SYNC_DELAY && candidates[data.withId]) {
    if (candidates[data.withId].notFound) {
      showUserNotFoundMessages(data.tabId);
    } else {
      showUserMessages(candidates[data.withId], data.tabId);
    }
    return;
  }
  if (data) {
    send(
      'POST',
      `${domain}/candidate/check/vk`,
      data,
      (c, r) => {
        if (c && c === 204) {
          sendExtensionError(true);
        } else {
          console.log('Connection Error: ', c, r);
          if (c === 401) {
            Storage.clear();
          }
          sendExtensionError(false);
        }
      },
      r => {
        candidates[data.withId] = candidates[data.withId] || {};
        candidates[data.withId].syncAt = new Date().getTime();
        if (r.data.notFound) {
          showUserNotFoundMessages(data.tabId);
          candidates[data.withId] = { notFound: true };
          candidates[data.withNick] = { notFound: true };
          return;
        }
        candidates[data.withId] = r.data;
        candidates[data.withNick] = r.data;
        showUserMessages(r.data, data.tabId);
      },
    );
  }
}

function createCandidate(data) {
  if (data) {
    data.workGroup = workGroup;
    send(
      'POST',
      `${domain}/interview/candidate`,
      data,
      (c, r) => {
        alert('Упс, что то сломалось \nПопробуй еще раз\nЛибо сообщи администратору');
      },
      r => {
        clearExtension(data.tabId);
        showUserMessages(r.data, data.tabId);
        candidates[r.data.vk] = { ...r.data };
        candidates[r.data.vk].syncAt = new Date().getTime();
        if (typeof createCandidateCb === 'function') {
          createCandidateCb();
        }
      },
    );
  }
}

function updateCandidate(data) {
  if (data) {
    send(
      'PUT',
      `${domain}/candidate/field`,
      data,
      (c, r) => {
        alert('Упс, что то сломалось \nПопробуй еще раз\nЛибо сообщи администратору');
      },
      r => {
        clearExtension(data.tabId);
        candidates[data.tabId] = { ...candidates[data.tabId], [data.field]: data.value };
        candidates[data.tabId].syncAt = new Date().getTime();
        showUserMessages(candidates[data.tabId], data.tabId);
      },
    );
  }
}

function updateInterview(data) {
  if (data) {
    send(
      'PUT',
      `${domain}/interview`,
      data,
      (c, r) => {
        alert('Упс, что то сломалось \nПопробуй еще раз\nЛибо сообщи администратору');
      },
      r => {
        clearExtension(data.tabId);
        showUserMessages(r.data, data.tabId);
        candidates[r.data.vk] = { ...r.data, dates: {} };
        candidates[r.data.vk].syncAt = new Date().getTime();
        if (typeof createCandidateCb === 'function') {
          createCandidateCb();
        }
      },
    );
  }
}

function getCurrentTab(cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0];
    if (!activeTab) {
      return;
    }
    const activeTabId = activeTab.id;
    typeof cb === 'function' && cb(activeTabId, activeTab);
  });
}

const checkPage = (tab, tabId) => {
  clearExtension(tabId);
  const re = /^https:\/\/vk.com\/.*\?.*/;
  const user_page = /^https:\/\/vk.com/;
  const hasId = /^https:\/\/vk.com\/id(\d)+/;
  const { url } = tab;

  if (re.test(url)) {
    console.log('Invalid URL');
    return;
  }
  if (hasId.test(url)) {
    console.log('Has ID');
    checkDialogWithUser({
      withId: url,
      tabId,
    });
    return;
  }

  if (user_page.test(url)) {
    console.log('USER PAGE');
    setTimeout(checkPageAndReturnId, 0, tabId);
  }
};

chrome.tabs.getCurrent((tab, ...rest) => {
  if (tab && tab.url.indexOf('vk.com/im?sel=') > -1) {
    test(tab);
  }
});

chrome.tabs.onUpdated.addListener((tabId, c, tab) => {
  if (c && c.status === 'complete' && tab.active) {
    console.log('onUpdated ', tabId);
    checkPage(tab, tabId);
  }
});

chrome.tabs.onActivated.addListener(tabId => {
  chrome.tabs.get(tabId.tabId, tab => {
    if (tab && tab.status === 'complete') {
      console.log('onActivated ', tabId);
      checkPage(tab, tabId);
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!request.source) {
    return;
  }
  if (request.action === 'userID' && request.source) {
    return checkDialogWithUser(request.source);
  }
  if (request.action === 'userName' && request.source) {
    return createCandidate(request.source);
  }
});
