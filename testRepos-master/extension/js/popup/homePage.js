const HomePage = new (class HomePage {
  #el = {};

  #initialized = false;

  signOut = () => {
    chrome.extension.getBackgroundPage().SignOut();
    ROUTER.go('login');
  };

  init = user => {
    if (!this.#initialized) {
      this.initComponents(user);
    }
    this.#el.loggedBlock.classList.remove('hide-element');
    this.#el.hrName.innerText = user.fullName;
    this.fillCandidateInfo();
    this.#el.signOutBtn.addEventListener('click', this.signOut);
  };

  initComponents = () => {
    this.#initialized = true;
    this.#el.signOutBtn = document.getElementById('signOut');
    this.#el.loggedBlock = document.getElementById('loggedBlock');
    this.#el.hrName = document.getElementById('hrName');
    this.#el.markAsCandidateBtn = document.getElementById('markAsCandidateBtn');
    this.#el.markAsCandidateBtn.addEventListener('click', this.createCandidate);
    this.#el.loggedBlock.classList.remove('hide-element');
  };

  createCandidate = () => {
    if (!workGroup) {
      alert('Сначала надо выбрать рабочую группу');
      return;
    }
    chrome.extension.getBackgroundPage().CreateCandidateFromCurrentPage(workGroup, () => {
      this.fillCandidateInfo();
    });
  };

  fillCandidateInfo = () => {
    chrome.extension
      .getBackgroundPage()
      .GetCandidateForTab()
      .then(candidate => {
        if (candidate && candidate._id) {
          Candidate = new CandidateClass(candidate);
          this.#el.markAsCandidateBtn.classList.add('hide-element');
        } else {
          this.#el.markAsCandidateBtn.classList.remove('hide-element');
        }
      });
  };

  hide = () => {
    this.#el.loggedBlock.classList.add('hide-element');
    this.#el.signOutBtn.removeEventListener('click', this.signOut);
  };
})();
