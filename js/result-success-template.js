export default (game, rules, resultNumber, statsTemplate) => {
  const speedTemplate = !game.fast.count ? `` :
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${game.fast.count} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${rules.FAST_ANSWER_AWARD}</td>
      <td class="result__total">${game.fast.points}</td>
    </tr>`;

  const livesTemplate = !game.lives.count ? `` :
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${game.lives.count} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${rules.PER_LIVE_AWARD}</td>
      <td class="result__total">${game.lives.points}</td>
    </tr>`;

  const slowTemplate = !game.slow.count ? `` :
    `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${game.slow.count} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${rules.SLOW_ANSWER_PENALTY}</td>
      <td class="result__total">${game.slow.points}</td>
    </tr>`;

  const template =
  `<table class="result__table">
    <tr>
      <td class="result__number">${resultNumber}.</td>
      <td colspan="2">
        ${statsTemplate}
      </td>
      <td class="result__points">× ${rules.CORRECT_ANSWER_AWARD}</td>
      <td class="result__total">${game.correctAnswerPoints}</td>
    </tr>
    ${speedTemplate}
    ${livesTemplate}
    ${slowTemplate}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${game.totalPoints}</td>
    </tr>
  </table>`;

  return template;
};
