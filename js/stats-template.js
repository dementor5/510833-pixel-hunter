export default (answerResults, levelsAmount) => {
  let results = ``;
  for (let i = 0; i < levelsAmount; i++) {
    const status = answerResults[i] ? answerResults[i] : `unknown`;
    results += `<li class="stats__result stats__result--${status}"></li>`;
  }
  const template = `<ul class="stats">${results}</ul>`;
  return template;
};
