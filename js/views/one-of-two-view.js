import AbstractView from './abstract-view';

export default class OneOfTwoView extends AbstractView {
  constructor(level, statsTemplate) {
    super();
    this._level = level;
    this._image = level.answers[0].image;
    this._statsTemplate = statsTemplate;

  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._level.question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${this._image.url}" alt="Option 1" width="${this._image.width}" height="${this._image.height}">
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
    answerForm.addEventListener(`change`, (evt) => this.onFormChange(evt.currentTarget));
  }

  onFormChange() {}
}
