import StatsView from '../views/stats-view';
import ResultSuccessView from '../views/result-success-view';
import ResultFailView from '../views/result-fail-view';
import ResultView from '../views/result-view';
import renderHeader from './header-controller';
import {replaceScreenElements} from '../util';

export default (games, levelsAmount, rules) => {
  let results = ``;
  let lastResultLivesAmount = 0;
  games.forEach((game, i) => {
    if (i === 0) {
      lastResultLivesAmount = game.lives.count;
    }
    const resultNumber = i + 1;
    const answerResults = game.answerResults;
    const statsTemplate = new StatsView(answerResults, levelsAmount).template;
    const resultTemplate = game.lives.count
      ? new ResultSuccessView(game, rules, resultNumber, statsTemplate).template
      : new ResultFailView(resultNumber, statsTemplate).template;
    results += resultTemplate;
  });

  const resultView = new ResultView(lastResultLivesAmount, results);
  const header = renderHeader();

  replaceScreenElements(header, resultView.element);
};
