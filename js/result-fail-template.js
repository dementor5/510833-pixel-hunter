export default (resultNumber, statsTemplate) => {
  const template =
  `<table class="result__table">
    <tr>
      <td class="result__number">${resultNumber}.</td>
      <td>
        ${statsTemplate}
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>`;
  return template;
};
