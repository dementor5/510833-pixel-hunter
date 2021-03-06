import AbstractView from '../abstract-view';

export default class ResultView extends AbstractView {
  constructor(currentGameIsWin, results) {
    super();
    this._lastResultTitle = currentGameIsWin ? `Победа!` : `Поражение!`;
    this._results = results;
  }

  get template() {
    return `
      <section class="result">
        <h2 class="result__title">${this._lastResultTitle}</h2>
        ${this._results}
      </section>`;
  }

}
