import {getElement} from './util.js';

export default (lastResultLivesAmount, results) => {
  const lastResultTitle = lastResultLivesAmount ? `Победа!` : `Поражение!`;
  const template =
  `<section class="result">
    <h2 class="result__title">${lastResultTitle}</h2>
    ${results}
  </section>`;
  const element = getElement(template);
  return element;
};
