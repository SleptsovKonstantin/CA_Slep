class Router {
  #pages = {};

  #curPage = null;

  constructor(config) {
    this.#pages = config;
  }

  go(url, params) {
    if (!(this.#pages[url] && this.#pages[url].init)) {
      alert('Не могу найти страницу');
    }
    if (this.#curPage) {
      this.#curPage.hide();
    }
    this.#curPage = this.#pages[url];
    this.#pages[url].init(params);
  }
}
