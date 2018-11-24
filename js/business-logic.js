const RULES = {
  startLiveCount: 3,
  correctAnswerAward: 100,
  perLiveAward: 50,
  fastAnswerAward: 50,
  slowAnswerPenalty: 50,
  losePoints: -1,
  questionsCount: 10,
  fastAnswerTime: 10,
  SlowAnswerTime: 20
};

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

  if (answers.length < RULES.questionsCount) {
    pointsCount = RULES.losePoints;
    return pointsCount;
  }

  answers.forEach((it) => {
    if (it.correct) {
      pointsCount += RULES.correctAnswerAward;

      if (it.time < RULES.fastAnswerTime) {
        pointsCount += RULES.fastAnswerAward;
      } else if (it.time > RULES.SlowAnswerTime) {
        pointsCount -= RULES.slowAnswerPenalty;
      }
    }
  });

  pointsCount += livesCount * RULES.perLiveAward;

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

  if (time < RULES.fastAnswerTime) {
    checkResult = `fast`;
  } else if (time > RULES.SlowAnswerTime) {
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
