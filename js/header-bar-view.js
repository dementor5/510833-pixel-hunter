import {render, getFragmentWithChildren} from './util.js';
export default (livesAmount) => {
  const time = 15;
  const template = `
    <div class="game__timer">${time}</div>
    <div class="game__lives">
      ${drawHeart(livesAmount > 3)}
      ${drawHeart(livesAmount > 2)}
      ${drawHeart(livesAmount > 1)}
    </div>
  </header>`;
  const element = getFragmentWithChildren(render(template));
  return element;
};

function drawHeart(full) {
  const name = full ? `heart__full.svg` : `heart__empty.svg`;
  const altName = full ? `Life` : `Missed Life`;
  return `<img src="img/${name}" class="game__heart" alt="${altName}" width="31" height="27">`;
}
