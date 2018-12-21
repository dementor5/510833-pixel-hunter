import AbstractView from '../abstract-view';
import {DEBUG, Type2Hint} from '../settings';

export default class TinderLikeView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._question = level.question;
    const first = level.answers[0];
    this._hint = DEBUG ? Type2Hint[first.type] : ``;
    this._image = first.image;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this._image.url}" alt="Option 1" width="${this._image.width}" height="${this._image.height}">
            ${this._getHintTemplate(this._hint)}
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="painting">
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        ${this._statsTemplate}
      </section>`;
  }

  bind() {
    const answerForm = this._element.querySelector(`.game__content`);
    answerForm.addEventListener(`change`, (evt) => this.onAnswer(evt.currentTarget));
  }

  _getHintTemplate(value) {
    return value ? `<div class="game__hint">${value}</div>` : ``;
  }

  onFormChange() {}
}
