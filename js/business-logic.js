import {Rule} from './constants.js';

function calculatePoints(answers, livesCount) {
  if (typeof answers !== `object`) {
    throw new Error(`answers should be of type object`);
  }
  if (typeof livesCount !== `number`) {
    throw new Error(`liveCount should be of type number`);
  }
  if (livesCount < 0) {
    throw new Error(`liveCount should not be negative value`);
  }

  let pointsCount = 0;

  if (answers.length < Rule.QUESTIONS_COUNT) {
    pointsCount = Rule.LOSE_POINTS;
    return pointsCount;
  }

  answers.forEach((it) => {
    if (it.correct) {
      pointsCount += Rule.CORRECT_ANSWER_AWARD;

      if (it.time < Rule.FAST_ANSWER_TIME) {
        pointsCount += Rule.FAST_ANSWER_AWARD;
      } else if (it.time > Rule.SLOW_ANSWER_TIME) {
        pointsCount -= Rule.SOLOW_ANSWER_PENALTY;
      }
    }
  });

  pointsCount += livesCount * Rule.PER_LIVE_AWARD;

  return pointsCount;
}

function reduceLivesCount(livesCount) {
  return --livesCount;
}

function changeScreen(currentScreen) {
  return ++currentScreen;
}

function checkTime(time) {
  if (typeof time !== `number`) {
    throw new Error(`time should be of type number`);
  }
  if (time < 0) {
    throw new Error(`time should not be negative value`);
  }

  let checkResult = null;

  if (time < Rule.FAST_ANSWER_TIME) {
    checkResult = `fast`;
  } else if (time > Rule.SLOW_ANSWER_TIME) {
    checkResult = `slow`;
  }

  return checkResult;
}

export {
  calculatePoints,
  reduceLivesCount,
  changeScreen,
  checkTime
};
