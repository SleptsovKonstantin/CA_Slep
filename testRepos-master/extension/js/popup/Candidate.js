const candidtateSELECT = {
  name: 'candidateName',
  interview: 'interview-date',
  writeAfter: 'may-write-date',
  noWrite: 'not-write-again',
};

class CandidateClass {
  name = '';

  dates = '';

  mayWriteAfter = '';

  noWriteAgain = false;

  static el = {
    name: null,
    interview: null,
    writeAfter: null,
    noWrite: null,
  };

  constructor(data) {
    this.data = data;
    this.initEl();
    CandidateClass.el.name.innerHTML = `<a href="http://hr.exceed-team.com/recruiting/?search=${data.vk}"    target="_blank"
            rel="noopener noreferrer">
        ${data.fio}</a>`;
    CandidateClass.el.interview.value = data.interviewDate
      ? new Date(data.interviewDate).toJSON().split('T')[0]
      : ' -- ';
    CandidateClass.el.writeAfter.value = data.mayWriteAfter
      ? new Date(data.mayWriteAfter).toJSON().split('T')[0]
      : ' -- ';
    CandidateClass.el.noWrite.checked = data.noWriteAgain;
  }

  initEl() {
    Object.keys(candidtateSELECT).forEach(key => {
      if (!CandidateClass.el[key]) {
        CandidateClass.el[key] = document.getElementById(candidtateSELECT[key]);
        CandidateClass.el[key].classList.remove('hide-element');
        CandidateClass.el[key].addEventListener('change', this.handleChange);
      }
    });
    if (this.data?.interviewDate) {
      CandidateClass.el.interview.classList.add('hide-element');
    }
  }

  // TODO SAVE CANDIDATE AFTER update in cache
  handleChange = e => {
    const { value, checked, type } = e.target;
    const name = e.target.getAttribute('name');
    const itemId = this.data?._id;
    const forSend = {
      itemId,
      value: type === 'checkbox' ? checked : value,
      field: name,
    };

    chrome.extension.getBackgroundPage().SetCandidateInfo(forSend);
  };
}
