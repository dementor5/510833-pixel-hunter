import {render, changeScreen} from './util.js';
import renderHeader from './header-view.js';
import getResultSuccessTemplate from './result-success-template.js';
import getResultFailTemplate from './result-fail-template.js';
import getFilledStatsTemplate from './stats-template.js';
import renderResultScreen from './result-view.js';

export default (games, levelsAmount, rules) => {
  let results = ``;
  let lastResultLivesAmount = 0;
  games.forEach((game, i) => {
    if (i === 0) {
      lastResultLivesAmount = game.lives.count;
    }
    const resultNumber = i + 1;
    const answerResults = game.answerResults;
    const statsTemplate = getFilledStatsTemplate(answerResults, levelsAmount);
    const resultTemplate = game.lives.count
      ? getResultSuccessTemplate(game, rules, resultNumber, statsTemplate)
      : getResultFailTemplate(resultNumber, statsTemplate);
    results += resultTemplate;
  });

  const screen = renderResultScreen(lastResultLivesAmount, results);
  const header = renderHeader();

  const container = render();
  container.appendChild(header);
  container.appendChild(screen);
  changeScreen(container);
};
