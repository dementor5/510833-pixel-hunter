import HeaderController from './header-controller';
import StatsView from '../views/stats-view';
import ResultSuccessView from '../views/result-success-view';
import ResultFailView from '../views/result-fail-view';
import ResultView from '../views/result-view';

export default class ResultConroller {
  constructor(model) {
    this._model = model;
    const headerController = new HeaderController();
    this._root = document.createElement(`div`);
    this._root.appendChild(headerController.element);
    this._root.appendChild(this._resultView.element);
  }

  get element() {
    return this._root;
  }

  get _resultView() {
    let currentGameIsWin = false;

    const scoresTemplate = this._model.scores.map((score, i) => {
      currentGameIsWin = score.lives.count > 0;
      const resultNumber = i + 1;
      const statsView = new StatsView(score.answerResults);

      const currentResultView = currentGameIsWin
        ? new ResultSuccessView(score, resultNumber, statsView.template)
        : new ResultFailView(resultNumber, statsView.template);

      return currentResultView.template;
    }).reverse().join(``);

    const resultView = new ResultView(currentGameIsWin, scoresTemplate);
    return resultView;
  }

}
