import AbstractView from '../abstract-view';
import {DEBUG, Type2Hint} from '../settings';

export default class TwoOfTwoView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._level = level;
    this._first = level.answers[0];
    this._second = level.answers[1];
    this._firstHint = DEBUG ? Type2Hint[this._first.type] : ``;
    this._secondHint = DEBUG ? Type2Hint[this._second.type] : ``;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._level.question}</p>
        <form class="game__content">
          <div class="game__option">
            <img src="${this._first.image.url}" alt="Option 1" width="${this._first.image.width}" height="${this._first.image.height}">
            ${this._getHintTemplate(this._firstHint)}
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
            <img src="${this._second.image.url}" alt="Option 2" width="${this._second.image.width}" height="${this._second.image.height}">
            ${this._getHintTemplate(this._secondHint)}
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

  _getHintTemplate(value) {
    return value ? `<div class="game__hint">${value}</div>` : ``;
  }
}
