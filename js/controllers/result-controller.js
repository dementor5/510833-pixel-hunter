import StatsView from '../views/stats-view';
import ResultSuccessView from '../views/result-success-view';
import ResultFailView from '../views/result-fail-view';
import ResultView from '../views/result-view';
import RenderHeader from './header-controller';

export default class ResultConroller {

  constructor(model) {
    let results = ``;
    let lastResultLivesAmount = 0;

    model.games.forEach((game, i) => {
      if (i === 0) {
        lastResultLivesAmount = game.lives.count;
      }
      const resultNumber = i + 1;
      const statsTemplate = new StatsView(game.answerResults, model.levels.length).template;

      const resultTemplate = game.lives.count
        ? new ResultSuccessView(game, model.rules, resultNumber, statsTemplate).template
        : new ResultFailView(resultNumber, statsTemplate).template;

      results += resultTemplate;
    });

    const resultView = new ResultView(lastResultLivesAmount, results);
    const header = new RenderHeader();

    this._root = document.createElement(`div`);
    this._root.appendChild(header.element);
    this._root.appendChild(resultView.element);
  }

  get element() {
    return this._root;
  }

}
