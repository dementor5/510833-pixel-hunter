import AbstractView from './abstract-view';

export default class ResultFailView extends AbstractView {
  constructor(resultNumber, statsTemplate) {
    super();
    this._resultNumber = resultNumber;
    this._statsTemplate = statsTemplate;
  }

  get template() {
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">${this._resultNumber}.</td>
          <td>
            ${this._statsTemplate}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>`;
  }
}
