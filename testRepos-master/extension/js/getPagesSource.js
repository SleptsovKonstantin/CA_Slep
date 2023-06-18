let last;
const user = document.querySelector('a.top_profile_link').href;
let firstStart = true;
function GetDialog() {
  const message = [];
  const dialog = document.querySelector('div._im_peer_history');
  setTimeout(() => {
    dialog.querySelectorAll('div.im-mess-stack').forEach(t => {
      t.querySelectorAll('li').forEach(ms => {
        message.push(getMessage(t.dataset.peer, ms, true));
      });
    });
    last = Number(message[message.length - 1].id);
    chrome.runtime.sendMessage({
      action: 'getDialog',
      source: message,
    });
  }, 1000);
}

document.querySelector('._im_peer_history').addEventListener(
  'DOMNodeInserted',
  () => {
    const lch = document.querySelector('div.im-mess-stack:last-child');
    const id = Number(lch.querySelector('li:last-child').dataset.msgid) || null;
    if (!firstStart && lch && lch.querySelector('.im-mess:last-child') && id && id !== last) {
      chrome.runtime.sendMessage({
        action: 'message',
        source: GetNewMessage(id, lch),
      });
    }
    firstStart = false;
  },
  false,
);

function GetNewMessage(id, lch) {
  last = id;
  const msg = lch.querySelector('.im-mess:last-child');
  const newMessage = getMessage(lch.dataset.peer, msg);
  return newMessage;
}

function getMessage(from, msg, a) {
  const info = msg.dataset;
  const mgsEl = msg.querySelector('div.im-mess--text');
  const isMedia = mgsEl.childNodes.length && mgsEl.childNodes[0].nodeType === 1;
  const text = !isMedia ? mgsEl.innerText : 'media content';
  const media = !isMedia ? null : mgsEl.innerHTML;
  return {
    from,
    dialog_with: info.peer,
    time: `${info.ts}000`,
    message: text.trim(),
    media,
    id: info.msgid,
    user: user.split('id')[1],
  };
}
GetDialog();
