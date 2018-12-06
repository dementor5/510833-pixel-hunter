import {getElement} from './util.js';
import {greeting} from './data-controller.js';
export default () => {
  const template = `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>`;
  const element = getElement(template);
  const backButton = element.querySelector(`.back`);
  backButton.addEventListener(`click`, () => greeting());
  return element;
};
