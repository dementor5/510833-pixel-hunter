import AbstractView from '../abstract-view';

export default class StatsTemplate extends AbstractView {
  constructor(answerResults) {
    super();
    this._results = answerResults.map((result) => {
      return `<li class="stats__result stats__result--${result}"></li>`;
    }).join(``);
  }

  get template() {
    return `<ul class="stats">${this._results}</ul>`;
  }
}
