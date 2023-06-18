function checkPage() {
  if (document.getElementById('profile_short')) {
    setTimeout(() => {
      profileMethod();
    }, 1000); // to make sure that page was loaded
  }
}

function profileMethod() {
  const name = document
    .querySelector('.page_name')
    .innerText.trim();
  chrome.runtime.sendMessage({
    action: 'userName',
    source: {
      force: true,
      vk: window.location.href,
      source: 'vk',
      fio: name,
      tabId: window.ECRMTABID,
    },
  });
}

checkPage();
