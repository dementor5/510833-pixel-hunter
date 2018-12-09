import AbstractView from './abstract-view';

export default class ResultSuccessView extends AbstractView {
  constructor(game, rules, resultNumber, statsTemplate) {
    super();
    this._game = game;
    this._rules = rules;
    this._resultNumber = resultNumber;
    this._statsTemplate = statsTemplate;
    this._speedTemplate = !game.fast.count ? `` :
      `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${game.fast.count} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${rules.FAST_ANSWER_AWARD}</td>
        <td class="result__total">${game.fast.points}</td>
      </tr>`;
    this._livesTemplate = !game.lives.count ? `` :
      `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game.lives.count} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${rules.PER_LIVE_AWARD}</td>
        <td class="result__total">${game.lives.points}</td>
      </tr>`;
    this._slowTemplate = !game.slow.count ? `` :
      `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${game.slow.count} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${rules.SLOW_ANSWER_PENALTY}</td>
        <td class="result__total">${game.slow.points}</td>
      </tr>`;
  }

  get template() {
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">${this._resultNumber}.</td>
          <td colspan="2">
            ${this._statsTemplate}
          </td>
          <td class="result__points">× ${this._rules.CORRECT_ANSWER_AWARD}</td>
          <td class="result__total">${this._game.correctAnswerPoints}</td>
        </tr>
        ${this._speedTemplate}
        ${this._livesTemplate}
        ${this._slowTemplate}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this._game.totalPoints}</td>
        </tr>
      </table>`;
  }
}
