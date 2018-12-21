import AbstractView from '../abstract-view';
import {DEBUG, Type2Hint} from '../settings';

export default class OneOfThreeView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._question = level.question;
    this._first = level.answers[0];
    this._second = level.answers[1];
    this._third = level.answers[2];
    this._firstHint = DEBUG ? Type2Hint[this._first.type] : ``;
    this._secondHint = DEBUG ? Type2Hint[this._second.type] : ``;
    this._thirdHint = DEBUG ? Type2Hint[this._third.type] : ``;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._question}</p>
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img src="${this._first.image.url}" alt="Option 1" width="${this._first.image.width}" height="${this._first.image.height}">
            ${this._getHintTemplate(this._firstHint)}
          </div>
          <div class="game__option  game__option--selected">
            <img src="${this._second.image.url}" alt="Option 2" width="${this._second.image.width}" height="${this._second.image.height}">
            ${this._getHintTemplate(this._secondHint)}
          </div>
          <div class="game__option">
            <img src="${this._third.image.url}" alt="Option 3" width="${this._third.image.width}" height="${this._third.image.height}">
            ${this._getHintTemplate(this._thirdHint)}
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

  _getHintTemplate(value) {
    return value ? `<div class="game__hint">${value}</div>` : ``;
  }

}
