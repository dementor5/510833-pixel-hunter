export function checkAnswers(game, levels, rules) {
  const newGame = Object.assign({}, game);

  const level = levels[newGame.currentLevelIndex];
  const correctAnswers = level.answers;
  const userAnswers = newGame.currentLevelAnswers;
  const time = userAnswers.time;

  let correct;
  switch (level.type) {
    case `two-of-two`:
      correct = checkTwoOfTwo(correctAnswers, userAnswers);
      break;
    case `tinder-like`:
      correct = checkOneOfTwo(correctAnswers, userAnswers);
      break;
    case `one-of-three`:
      correct = checkOneOfThree(correctAnswers, userAnswers);
  }
  newGame.answerResults.push(correct ? checkTime(time, rules) : `wrong`);
  return newGame;
}

export function checkTwoOfTwo(correctAnswers, userAnswers) {
  return correctAnswers[0].type === userAnswers.question1
    && correctAnswers[1].type === userAnswers.question2;
}

export function checkOneOfTwo(correctAnswers, userAnswers) {
  return correctAnswers[0].type === userAnswers.question1;
}

export function checkOneOfThree(correctAnswers, userAnswers) {
  const correctAnswer = getCorrectAnswer(correctAnswers);
  return correctAnswer.index === userAnswers.question1;
}

export function getCorrectAnswer(answers) {
  const types = answers.map((it) => it.type);
  return getUniqueArrayElement(types);
}

export function getUniqueArrayElement(array) {
  let element = {};
  for (const it of array) {
    const index = array.indexOf(it);
    if (index === array.lastIndexOf(it)) {
      element.index = index;
      element.value = it;
      break;
    }
  }
  return element;
}

export function checkTime(time, rules) {
  if (typeof time !== `number`) {
    throw new Error(`time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`time should not be negative value`);
  }

  let score = `correct`;
  if (time < rules.FAST_ANSWER_TIME) {
    score = `fast`;
  } else if (time > rules.SLOW_ANSWER_TIME) {
    score = `slow`;
  }
  return score;
}

export function checkLives(game) {
  const lastIndex = game.answerResults.length - 1;
  const lastAnswerStatus = game.answerResults[lastIndex];
  if (lastAnswerStatus === `wrong`) {
    const newGame = Object.assign({}, game);
    newGame.lives.count--;
    return newGame;
  } else {
    return game;
  }
}

export function changeLevel(game, levels) {
  const lastLevelIndex = levels.length - 1;
  if (game.lives.count === 0) {
    throw new Error(`you are dead`);
  } else if (game.currentLevelIndex === lastLevelIndex) {
    throw new Error(`allready last level`);
  }
  const newGame = Object.assign({}, game);
  newGame.currentLevelIndex++;
  return newGame;
}

export function checkResults(game, rules) {
  const result = Object.assign({}, game);
  result.lives.points = result.lives.count * rules.PER_LIVE_AWARD;
  const {fast = 0, slow = 0, wrong = 0} = getArrayUniqueElementsCount(game.answerResults);
  result.correctAnswers = result.answerResults.length - wrong;
  result.correctAnswerPoints = result.correctAnswers * rules.CORRECT_ANSWER_AWARD;
  result.fast = {
    count: fast,
    points: fast * rules.FAST_ANSWER_AWARD,
  };
  result.slow = {
    count: slow,
    points: slow * -rules.SLOW_ANSWER_PENALTY,
  };
  result.totalPoints = result.correctAnswerPoints
    + result.lives.points
    + result.fast.points
    + result.slow.points;
  return result;
}

export function getArrayUniqueElementsCount(array) {
  return array.reduce((acc, it) => {
    acc[it] = (acc[it] || 0) + 1;
    return acc;
  }, {});
}
