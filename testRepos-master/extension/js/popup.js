/* eslint-disable no-undef */
const el = {
  loginBtn: null,
};
let Candidate = null;

let ROUTER = null;

let workGroup = '';

const handleleChangeSelect = e => {
  const index = e.target.selectedIndex;

  const option = e.target.childNodes[index];
  workGroup = option.getAttribute('value');
  chrome.extension.getBackgroundPage().setWorkGroup(workGroup);
};

function onWindowLoad() {
  ROUTER = new Router({
    home: HomePage,
    login: LoginPage,
  });

  chrome.extension
    .getBackgroundPage()
    .IsAuth()
    .then(user => {
      if (user) {
        ROUTER.go('home', user);
      } else {
        ROUTER.go('login');
      }
    })
    .catch(e => {
      console.log('onWindowLoad', e);
      ROUTER.go('login');
    });

  chrome.extension.getBackgroundPage().getWorkGroups((groups, selectedGroup) => {
    const select = document.createElement('select');
    const optEmpty = document.createElement('option');
    optEmpty.setAttribute('value', '');
    optEmpty.innerText = 'Выберите рабочую группу';
    select.appendChild(optEmpty);

    if (selectedGroup) {
      workGroup = selectedGroup;
    }

    let selectedIndex = '';
    groups.forEach((group, index) => {
      const opt = document.createElement('option');
      if (group._id === selectedGroup) {
        opt.setAttribute('selected', 'true');
      }
      opt.setAttribute('value', group._id);
      opt.innerText = group.name;
      select.appendChild(opt);
    });

    console.log('LOOOG', selectedIndex);

    el.select = select;
    select.addEventListener('change', handleleChangeSelect);
    const selectWrapper = document.getElementById('workGroups');
    selectWrapper.appendChild(select);
  });
}

window.onload = onWindowLoad;
