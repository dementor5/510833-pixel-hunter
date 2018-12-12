import {Rule} from './settings';

export function checkAnswer(userAnswer, level, time) {
  let result;
  switch (level.type) {
    case `two-of-two`:
      result = checkTwoOfTwo(level.answers, userAnswer);
      break;
    case `tinder-like`:
      result = checkOneOfTwo(level.answers, userAnswer);
      break;
    case `one-of-three`:
      result = checkOneOfThree(level.answers, userAnswer);
  }

  return result ? checkTime(time) : `wrong`;
}

export function checkTwoOfTwo(correctAnswers, answer) {
  return correctAnswers[0].type === answer.question1
    && correctAnswers[1].type === answer.question2;
}

export function checkOneOfTwo(correctAnswers, answer) {
  return correctAnswers[0].type === answer.question1;
}

export function checkOneOfThree(correctAnswers, answer) {
  const correctAnswer = getCorrectAnswer(correctAnswers);
  return correctAnswer.index === answer.question1;
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

export function checkTime(time) {
  if (typeof time !== `number`) {
    throw new Error(`time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`time should not be negative value`);
  }

  let score = `correct`;
  if (time < Rule.FAST_ANSWER_TIME) {
    score = `fast`;
  } else if (time > Rule.SLOW_ANSWER_TIME) {
    score = `slow`;
  }
  return score;
}

export function checkLives(answerResult, livesCount) {
  return answerResult === `wrong` ? --livesCount : livesCount;
}

export function changeLevel(levelIndex) {
  return ++levelIndex;
}

export function checkResults(game) {
  const result = {};
  const {fast = 0, slow = 0, wrong = 0} = getArrayUniqueElementsCount(game.answerResults);
  const correctCount = game.answerResults.length - wrong;

  result.lives = {
    count: game.lives.count,
    points: game.lives.count * Rule.PER_LIVE_AWARD,
  };
  result.correct = {
    count: correctCount,
    points: correctCount * Rule.CORRECT_ANSWER_AWARD,
  };
  result.fast = {
    count: fast,
    points: fast * Rule.FAST_ANSWER_AWARD,
  };
  result.slow = {
    count: slow,
    points: slow * -Rule.SLOW_ANSWER_PENALTY,
  };
  result.totalPoints = result.correct.points + result.lives.points
    + result.fast.points + result.slow.points;

  return result;
}

export function getArrayUniqueElementsCount(array) {
  return array.reduce((acc, it) => {
    acc[it] = (acc[it] || 0) + 1;
    return acc;
  }, {});
}

export function tick(time) {
  return ++time;
}

export function resetTimer() {
  return 0;
}
