const questionsCount = 10;
const correctAnswerAward = 100;
const longSpeedTimeLimit = 20;
const shortSpeedTimeLimit = 10;
const bonusPoints = 50;

function sumUpResult(answers, liveCount) {
  if (typeof answers !== `object`) {
    throw new Error(`answers should be of type object`);
  }

  if (typeof liveCount !== `number`) {
    throw new Error(`liveCount should be of type number`);
  }

  if (liveCount < 0) {
    throw new Error(`liveCount should not be negative value`);
  }

  let result = 0;

  if (answers.length < questionsCount) {
    result = -1;
    return result;
  }

  answers.forEach((it) => {
    if (it.correct) {
      result += correctAnswerAward;

      if (it.time > longSpeedTimeLimit) {
        result -= bonusPoints;
      } else if (it.time < shortSpeedTimeLimit) {
        result += bonusPoints;
      }
    }
  });

  result += bonusPoints * liveCount;

  return result;
}

export {
  sumUpResult
};
