const LoginPage = new (class LoginPage {
  #el = {};

  #initialized = false;

  signIn = () => {
    const login = this.#el.loginInput.value;
    const pass = this.#el.passInput.value;
    chrome.extension
      .getBackgroundPage()
      .SignIn(login, pass)
      .then(user => {
        this.hide();
        ROUTER.go('home', user);
      });
  };

  init = onHide => {
    // if (this.#initialized) {
    //   el.signOutBtn.addEventListener('click', this.signIn);
    //   return;
    // }
    this.#initialized = true;
    this.#el.loginBlock = document.getElementById('loginBlock');
    this.#el.loginBtn = document.getElementById('signIn');
    this.#el.loginInput = document.getElementById('loginInput');
    this.#el.passInput = document.getElementById('passInput');
    this.#el.loginBlock.classList.remove('hide-element');

    this.#el.loginBtn.addEventListener('click', this.signIn);
  };

  hide = (...params) => {
    this.#el.loginBlock.classList.add('hide-element');
    this.#el.loginBtn.removeEventListener('click', this.signIn);
  };
})();
