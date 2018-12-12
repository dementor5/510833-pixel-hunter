import AbstractView from '../abstract-view';

export default class OneOfThreeView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._level = level;
    this._first = level.answers[0].image;
    this._second = level.answers[1].image;
    this._third = level.answers[2].image;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._level.question}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img src="${this._first.url}" alt="Option 1" width="${this._first.width}" height="${this._first.height}">
          </div>
          <div class="game__option  game__option--selected">
            <img src="${this._second.url}" alt="Option 2" width="${this._second.width}" height="${this._second.height}">
          </div>
          <div class="game__option">
            <img src="${this._third.url}" alt="Option 3" width="${this._third.width}" height="${this._third.height}">
          </div>
        </form>
        ${this._statsTemplate}
      </section>`;
  }

  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`click`, (evt) => this.onClick(evt.target));
  }

  onClick() {}
}
