import AbstractView from '../abstract-view';

export default class HeaderView extends AbstractView {
  constructor(barTemplate) {
    super();
    this._barTemplate = barTemplate ? barTemplate : ``;
  }
  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${this._barTemplate}
      </header>`;
  }

  bind() {
    const backButton = this._element.querySelector(`.back`);
    backButton.addEventListener(`click`, this.onClick);
  }

  onClick() {}
}
