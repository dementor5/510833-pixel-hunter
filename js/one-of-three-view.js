import {getElement} from './util.js';
import {continueGame} from './data-controller.js';

export default (level, statsTemplate) => {
  const first = level.answers[0].image;
  const second = level.answers[1].image;
  const third = level.answers[2].image;
  const template =
`<section class="game">
  <p class="game__task">${level.question}</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="${first.url}" alt="Option 1" width="${first.width}" height="${first.height}">
    </div>
    <div class="game__option  game__option--selected">
      <img src="${second.url}" alt="Option 2" width="${second.width}" height="${second.height}">
    </div>
    <div class="game__option">
      <img src="${third.url}" alt="Option 3" width="${third.width}" height="${third.height}">
    </div>
  </form>
  ${statsTemplate}
</section>`;
  const element = getElement(template);
  const gameContent = element.querySelector(`.game__content`);
  gameContent.addEventListener(`click`, (evt) => {
    switchToNextScreenIfNeeded(evt.target);
  });
  return element;
};

function switchToNextScreenIfNeeded(el) {
  if (!el.alt) {
    return;
  }
  const imageNumber = el.alt[el.alt.length - 1];
  const answerIndex = imageNumber - 1;
  const answers = {
    question1: answerIndex,
    time: 15,
  };
  continueGame(answers);
}
