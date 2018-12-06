import {getElement} from './util.js';
import {continueGame} from './data-controller.js';
export default (level, statsTemplate) => {
  const first = level.answers[0].image;
  const second = level.answers[1].image;
  const template =
`<section class="game">
  <p class="game__task">${level.question}</p>
  <form class="game__content">
    <div class="game__option">
      <img src="${first.url}" alt="Option 1" width="${first.width}" height="${first.height}">
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
      <img src="${second.url}" alt="Option 2" width="${second.width}" height="${second.height}">
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
  ${statsTemplate}
</section>`;
  const element = getElement(template);
  const gameContent = element.querySelector(`.game__content`);
  gameContent.addEventListener(`change`, (evt) => checkFormStatus(evt.currentTarget));
  return element;
};

function checkFormStatus(form) {
  const formData = new FormData(form);
  const formStatus = formData.has(`question1`) && formData.has(`question2`);
  if (formStatus) {
    const answers = {
      question1: formData.get(`question1`),
      question2: formData.get(`question2`),
      time: 15,
    };
    continueGame(answers);
  }
}

