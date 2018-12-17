import HeaderController from './header-controller';
import LoadingIndicatorView from '../views/loading-indicator-view';
import StatsView from '../views/stats-view';
import ResultSuccessView from '../views/result-success-view';
import ResultFailView from '../views/result-fail-view';
import ResultView from '../views/result-view';

export default class ResultConroller {
  constructor() {
    const headerController = new HeaderController();
    this._loadingIndicatorView = new LoadingIndicatorView();
    this._root = document.createElement(`div`);

    this._root.appendChild(headerController.element);
    this._root.appendChild(this._loadingIndicatorView.element);
  }

  get element() {
    return this._root;
  }

  showResults(model) {
    let currentGameIsWin = false;

    const scoresTemplate = model.scores.map((score, i) => {
      currentGameIsWin = score.lives.count > 0;
      const resultNumber = i + 1;
      const statsView = new StatsView(score.answerResults);

      const currentResultView = currentGameIsWin
        ? new ResultSuccessView(score, resultNumber, statsView.template)
        : new ResultFailView(resultNumber, statsView.template);

      return currentResultView.template;
    }).reverse().join(``);

    const resultView = new ResultView(currentGameIsWin, scoresTemplate);

    this._loadingIndicatorView.stop();
    this._root.appendChild(resultView.element);
  }

}
