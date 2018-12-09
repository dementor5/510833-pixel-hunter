import AbstractView from './abstract-view';

export default class StatsTemplate extends AbstractView {
  constructor(answerResults, levelsAmount) {
    super();
    this._results = ``;
    for (let i = 0; i < levelsAmount; i++) {
      const status = answerResults[i] ? answerResults[i] : `unknown`;
      this._results += `<li class="stats__result stats__result--${status}"></li>`;
    }
  }

  get template() {
    return `<ul class="stats">${this._results}</ul>`;
  }
}
