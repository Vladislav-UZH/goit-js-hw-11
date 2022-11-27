export default class SearchBtnApi {
  constructor({ selector, hidden = false }) {
    this.selector = selector;
    this.refs = this.getRefs(selector);
    hidden && this.enable();
  }
  getRefs() {
    const refs = {};
    refs.searchBtn = document.querySelector(this.selector);
    refs.spinner = document.querySelector('.spinner');
    refs.btnLabel = document.querySelector('.form__submit-btn-label');
    return refs;
  }
  //   show(valueClass) {
  //     const el = this.refs.spinner;
  //     el.classList.remove(valueClass);
  //   }
  //   hide(valueClass) {
  //     const el = document.querySelector(this.selectorEl);
  //     el.classList.add(valueClass);
  //   }
  enable() {
    this.refs.searchBtn.disabled = false;
    this.refs.btnLabel.textContent = 'Search';
    this.refs.spinner.classList.add('is-hidden');
  }
  disable() {
    this.refs.searchBtn.disabled = true;
    this.refs.btnLabel.textContent = 'Loading..';
    this.refs.spinner.classList.remove('is-hidden');
  }
}
