import {Rule} from './settings';

export function tick(time) {
  return ++time;
}

export function resetTimer() {
  return 0;
}

export function checkTime(time) {
  if (typeof time !== `number`) {
    throw new Error(`time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`time should not be negative value`);
  }

  const startWarningAnimationTime = Rule.TIMEOUT_ANSWER_TIME - Rule.WARNING_ANSWER_TIME;

  let estimate = `fast`;
  if (time >= Rule.FAST_ANSWER_TIME && time <= Rule.SLOW_ANSWER_TIME) {
    estimate = `correct`;
  } else if (time > Rule.SLOW_ANSWER_TIME && time <= startWarningAnimationTime) {
    estimate = `slow`;
  } else if (time > startWarningAnimationTime && time <= Rule.TIMEOUT_ANSWER_TIME) {
    estimate = `warning`;
  } else if (time > Rule.TIMEOUT_ANSWER_TIME) {
    estimate = false;
  }
  return estimate;
}

export function checkAnswer(userAnswer, level, timeEstimate) {
  const result = `wrong`;
  if (!userAnswer) {
    return result;
  }
  if (timeEstimate === `warning`) {
    timeEstimate = `slow`;
  }
  const checkFunction = getCheckFunction(level.type);
  return checkFunction(level.answers, userAnswer) ? timeEstimate : result;
}

function getCheckFunction(levelType) {
  let checkFunction = null;
  switch (levelType) {
    case `two-of-two`:
      checkFunction = checkTwoOfTwo;
      break;
    case `tinder-like`:
      checkFunction = checkOneOfTwo;
      break;
    case `one-of-three`:
      checkFunction = checkOneOfThree;
  }
  return checkFunction;
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
  const element = {};
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

export function checkLives(answerResult, livesCount) {
  return answerResult === `wrong` ? --livesCount : livesCount;
}

export function changeLevel(levelIndex) {
  return ++levelIndex;
}

export function adaptScore(answerResults, livesCount) {
  if (!livesCount) {
    return {answerResults, lives: {count: livesCount}};
  }

  const {fast = 0, slow = 0, wrong = 0} = getArrayUniqueElementsCount(answerResults);
  const livesPoints = livesCount * Rule.PER_LIVE_AWARD;
  const correctCount = answerResults.length - wrong;
  const correctPoints = correctCount * Rule.CORRECT_ANSWER_AWARD;
  const fastPoints = fast * Rule.FAST_ANSWER_AWARD;
  const slowPoints = -slow * Rule.SLOW_ANSWER_PENALTY;

  return {
    answerResults,
    lives: {count: livesCount, points: livesPoints},
    correct: {count: correctCount, points: correctPoints},
    fast: {count: fast, points: fastPoints},
    slow: {count: slow, points: slowPoints},
    totalPoints: correctPoints + livesPoints + fastPoints + slowPoints,
  };
}

export function getArrayUniqueElementsCount(array) {
  return array.reduce((acc, it) => {
    acc[it] = (acc[it] || 0) + 1;
    return acc;
  }, {});
}
