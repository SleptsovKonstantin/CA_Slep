function checkPage() {
  if (document.getElementById('profile_short')) {
    setTimeout(() => {
      profileMethod();
    }, 1000); // to make sure that page was loaded
  }
}

function profileMethod() {
  const select = document.getElementById('profile_photo_link');
  console.log('LOOOG', select);
  if (select) {
    const link = select.getAttribute('href');
    let idPart = link.match(/photo\d+/);
    idPart = idPart && idPart[0].replace('photo', '');
    chrome.runtime.sendMessage({
      action: 'userID',
      source: {
        withId: `https://vk.com/id${idPart}`,
        withNick: window.location.href,
        tabId: window.ECRMTABID,
      },
    });
  } else {
    const select2 = document.querySelectorAll('.page_actions_item.PageActionItem--abuse');
    console.log('LOOOG', select2);
    if (select2 && select2.length && select2.length > 0) {
      select2.forEach(btn => {
        if (btn && btn.innerText && /ожаловаться/.test(btn.innerText)) {
          const btnStr = btn.outerHTML;
          let userID = btnStr.match(/openAbuseBox\(\d+/);
          userID = userID && userID[0] && userID[0].replace('openAbuseBox(', '');
          chrome.runtime.sendMessage({
            action: 'userID',
            source: {
              withId: `https://vk.com/id${userID}`,
              withNick: window.location.href,
              tabId: window.ECRMTABID,
            },
          });
        }
      });
    }else{
      const select3 = document.querySelector('[data-user_id]');
      let userID = select3.getAttribute('data-user_id');
      chrome.runtime.sendMessage({
        action: 'userID',
        source: {
          withId: `https://vk.com/id${userID}`,
          withNick: window.location.href,
          tabId: window.ECRMTABID,
        },
      });
    }
  }
}

checkPage();
