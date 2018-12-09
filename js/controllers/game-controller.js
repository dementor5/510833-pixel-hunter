import {replaceScreenElements} from '../util';
import renderHeader from './header-controller';
import BarView from '../views/bar-view';
import renderOneOfTwo from './one-of-two-controller';
import renderOneOfThree from './one-of-three-controller';
import renderTwoOfTwo from './two-of-two-controller';
import StatsView from '../views/stats-view';

export default (game, levels) => {
  const livesAmount = game.lives.count;
  const barTemplate = new BarView(livesAmount).template;
  const header = renderHeader(barTemplate);

  const levelsAmount = levels.length;
  const statsTemplate = new StatsView(game.answerResults, levelsAmount).template;

  const level = levels[game.currentLevelIndex];
  const renderGameScreen = getRenderScreenFunction(level.type);
  const screen = renderGameScreen(level, statsTemplate);

  replaceScreenElements(header, screen);
};

function getRenderScreenFunction(type) {
  let renderGameScreen;
  switch (type) {
    case `tinder-like`:
      renderGameScreen = renderOneOfTwo;
      break;
    case `one-of-three`:
      renderGameScreen = renderOneOfThree;
      break;
    case `two-of-two`:
      renderGameScreen = renderTwoOfTwo;
      break;
  }
  return renderGameScreen;
}
