import AbstractView from '../abstract-view';

export default class TwoOfTwoView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._level = level;
    this._first = level.answers[0].image;
    this._second = level.answers[1].image;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._level.question}</p>
        <form class="game__content">
          <div class="game__option">
            <img src="${this._first.url}" alt="Option 1" width="${this._first.width}" height="${this._first.height}">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src="${this._second.url}" alt="Option 2" width="${this._second.width}" height="${this._second.height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question2" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question2" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        ${this._statsTemplate}
      </section>`;
  }

  bind() {
    const gameContent = this._element.querySelector(`.game__content`);
    gameContent.addEventListener(`change`, (evt) => this.onFormChange(evt.currentTarget));
  }

  onFormChange() {}
}
