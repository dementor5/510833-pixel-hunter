import {render, changeScreen} from './util.js';
import renderHeader from './header-view.js';
import renderHeaderBar from './header-bar-view.js';
import renderTwoOfTwo from './two-of-two-view.js';
import renderOneOfTwo from './one-of-two-view.js';
import renderOneOfThree from './one-of-three-view.js';
import getFilledStatsTemplate from './stats-template.js';

export default (game, levels) => {
  const level = levels[game.currentLevelIndex];

  const header = renderHeader();

  const livesAmount = game.lives.count;
  const headerBar = renderHeaderBar(livesAmount);
  header.appendChild(headerBar);

  let renderGameScreen;
  switch (level.type) {
    case `two-of-two`:
      renderGameScreen = renderTwoOfTwo;
      break;
    case `tinder-like`:
      renderGameScreen = renderOneOfTwo;
      break;
    case `one-of-three`:
      renderGameScreen = renderOneOfThree;
      break;
  }

  const answerResults = game.answerResults;
  const levelsAmount = levels.length;
  const statsTemplate = getFilledStatsTemplate(answerResults, levelsAmount);

  const screen = renderGameScreen(level, statsTemplate);

  const container = render();
  container.appendChild(header);
  container.appendChild(screen);

  changeScreen(container);
};
