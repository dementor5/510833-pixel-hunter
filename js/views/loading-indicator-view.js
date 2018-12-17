import AbstractView from '../abstract-view';
const repeatTime = 50;

export default class loadingIndicatorView extends AbstractView {
  constructor() {
    super();
    this._index = 0;
    this._frames = `/-\\|`;
  }

  get template() {
    return `<p class="loading-indicator">Загрузка данных <span></span></p>`;
  }

  bind() {
    this._index = ++this._index < this._frames.length ? this._index : 0;
    const span = this.element.firstElementChild;
    span.textContent = this._frames[this._index];
    this._timer = setTimeout(() => this.bind(), repeatTime);
  }

  stop() {
    clearTimeout(this._timer);
    this.element.remove();
  }

}
