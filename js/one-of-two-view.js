import {getElement} from './util.js';
import {continueGame} from './data-controller.js';
export default (level, statsTemplate) => {
  const image = level.answers[0].image;
  const template =
`<section class="game">
  <p class="game__task">${level.question}</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${image.url}" alt="Option 1" width="${image.width}" height="${image.height}">
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
  ${statsTemplate}
</section>`;
  const element = getElement(template);
  const answerForm = element.querySelector(`.game__content`);
  answerForm.addEventListener(`change`, (evt) => switchToNextScreenIfNeeded(evt.currentTarget));
  return element;
};

function switchToNextScreenIfNeeded(form) {
  const formData = new FormData(form);
  if (formData.has(`question1`)) {
    const answers = {
      question1: formData.get(`question1`),
      time: 15
    };
    continueGame(answers);
  }
}
