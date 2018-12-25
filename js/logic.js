import {Rule, LevelType, TimeEstimate} from './settings';

const RESPONSE_INCORRECT_STATUS = `wrong`;
const START_WARNING_TIME = Rule.TIMEOUT_ANSWER_TIME - Rule.WARNING_ANSWER_TIME;

export const tick = (time) => {
  return ++time;
};

export const resetTimer = () => {
  return 0;
};

export const checkTime = (time) => {
  let estimate = TimeEstimate.FAST;
  if (time >= Rule.FAST_ANSWER_TIME && time <= Rule.SLOW_ANSWER_TIME) {
    estimate = TimeEstimate.CORRECT;
  } else if (time > Rule.SLOW_ANSWER_TIME && time <= START_WARNING_TIME) {
    estimate = TimeEstimate.SLOW;
  } else if (time > START_WARNING_TIME && time <= Rule.TIMEOUT_ANSWER_TIME) {
    estimate = TimeEstimate.WARNING;
  } else if (time > Rule.TIMEOUT_ANSWER_TIME) {
    estimate = TimeEstimate.TIMEOUT;
  }
  return estimate;
};

export const checkAnswer = (userAnswer, level, timeEstimate) => {
  if (!userAnswer) {
    return RESPONSE_INCORRECT_STATUS;
  }
  if (timeEstimate === TimeEstimate.WARNING) {
    timeEstimate = TimeEstimate.SLOW;
  }
  const checkFunction = getCheckFunction(level.type);
  return checkFunction(level.answers, userAnswer) ? timeEstimate : RESPONSE_INCORRECT_STATUS;
};

const getCheckFunction = (levelType) => {
  let checkFunction = null;
  switch (levelType) {
    case LevelType.TWO_OF_TWO:
      checkFunction = checkTwoOfTwo;
      break;
    case LevelType.TINDER_LIKE:
      checkFunction = checkOneOfTwo;
      break;
    case LevelType.ONE_OF_THREE:
      checkFunction = checkOneOfThree;
  }
  return checkFunction;
};

export const checkTwoOfTwo = (correctAnswers, answer) => {
  return correctAnswers[0].type === answer.question1
    && correctAnswers[1].type === answer.question2;
};

export const checkOneOfTwo = (correctAnswers, answer) => {
  return correctAnswers[0].type === answer.question1;
};

export const checkOneOfThree = (correctAnswers, answer) => {
  const correctAnswer = getCorrectAnswer(correctAnswers);
  return correctAnswer.index === answer.question1;
};

export const getCorrectAnswer = (answers) => {
  const types = answers.map((it) => it.type);
  return getUniqueArrayElement(types);
};

export const getUniqueArrayElement = (array) => {
  let element = null;
  for (const it of array) {
    const index = array.indexOf(it);
    if (index === array.lastIndexOf(it)) {
      element = {index, value: it};
      break;
    }
  }
  return element;
};

export const checkLives = (answerResult, livesCount) => {
  return answerResult === RESPONSE_INCORRECT_STATUS ? --livesCount : livesCount;
};

export const changeLevel = (levelIndex) => {
  return ++levelIndex;
};

export const adaptScore = (answerResults, livesCount) => {
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
};

export const getArrayUniqueElementsCount = (array) => {
  return array.reduce((acc, it) => {
    acc[it] = (acc[it] || 0) + 1;
    return acc;
  }, {});
};
