import {assert} from 'chai';
import {
  checkAnswer,
  checkTwoOfTwo,
  checkOneOfTwo,
  checkOneOfThree,
  getCorrectAnswer,
  getUniqueArrayElement,
  checkTime,
  changeLevel,
  checkLives,
  adaptScore,
  getArrayUniqueElementsCount,
  tick,
  resetTimer,
} from '../logic.js';

const checkTimeFunction = () => {
  it(`shold return 'fast' if time to answer on question < 10`, () => {
    const time = 8;
    assert.equal(checkTime(time), `fast`);
  });
  it(`shold return 'correct' if time to answer on question >= 10 and <= 20`, () => {
    const time = 15;
    assert.equal(checkTime(time), `correct`);
  });
  it(`shold return 'slow' if time to answer on question > 20 and <= 25`, () => {
    const time = 22;
    assert.equal(checkTime(time), `slow`);
  });
  it(`shold return 'warnging' if time to answer on question > 25 and <= 30`, () => {
    const time = 27;
    assert.equal(checkTime(time), `warning`);
  });
  it(`shold return false if time to answer on question > 30`, () => {
    const time = 31;
    assert.equal(checkTime(time), false);
  });
};

describe(`logic.test.js`, () => {

  describe(`tick()`, () => {
    it(`should increase time by one every run`, () => {
      const time = 0;
      const newTime = 1;
      assert.equal(tick(time), newTime);
    });
  });


  describe(`resetTimer()`, () => {
    it(`should return 0`, () => {
      assert.equal(resetTimer(), 0);
    });
  });


  describe(`checkTime()`, checkTimeFunction);


  describe(`checkAnswer()`, () => {
    it(`tinder-like should return wrong on wrong answer`, () => {
      const userAnswer = {question1: `photo`};
      const level = {
        type: `tinder-like`,
        answers: [{
          type: `painting`
        }],
      };
      const timeEstimate = `fast`;
      assert.equal(checkAnswer(userAnswer, level, timeEstimate), `wrong`);
    });

    it(`tinder-like should return correct on correct answer`, () => {
      const userAnswer = {question1: `painting`};
      const level = {
        type: `tinder-like`,
        answers: [{
          type: `painting`
        }],
      };
      const timeEstimate = `correct`;
      assert.equal(checkAnswer(userAnswer, level, timeEstimate), `correct`);
    });

    it(`tinder-like should return slow on correct slow answer`, () => {
      const userAnswer = {question1: `painting`};
      const level = {
        type: `tinder-like`,
        answers: [{
          type: `painting`
        }],
      };
      const timeEstimate = `slow`;
      assert.equal(checkAnswer(userAnswer, level, timeEstimate), `slow`);
    });

    it(`tinder-like should return fast on correct fast answer`, () => {
      const userAnswer = {question1: `painting`};
      const level = {
        type: `tinder-like`,
        answers: [{
          type: `painting`
        }],
      };
      const timeEstimate = `fast`;
      assert.equal(checkAnswer(userAnswer, level, timeEstimate), `fast`);
    });

  });

  describe(`checktwoOfTwo()`, () => {
    it(`shold return true if first answer and second correct`, () => {
      const correctAnswers = [
        {type: `painting`},
        {type: `photo`},
      ];
      const userAnswers = {
        question1: `painting`,
        question2: `photo`,
      };
      assert.equal(checkTwoOfTwo(correctAnswers, userAnswers), true);
    });

    it(`shold return false if the first answer incorrect`, () => {
      const correctAnswers = [
        {type: `painting`},
        {type: `photo`},
      ];
      const userAnswers = {
        question1: `photo`,
        question2: `photo`,
      };
      assert.equal(checkTwoOfTwo(correctAnswers, userAnswers), false);
    });

    it(`shold return false if the second answer incorrect`, () => {
      const correctAnswers = [
        {type: `painting`},
        {type: `photo`},
      ];
      const userAnswers = {
        question1: `photo`,
        question2: `painting`,
      };
      assert.equal(checkTwoOfTwo(correctAnswers, userAnswers), false);
    });
  });


  describe(`checkOneOfTwo()`, () => {
    it(`shold return true if first answer correct`, () => {
      const correctAnswers = [
        {type: `painting`},
      ];
      const userAnswers = {
        question1: `painting`,
      };
      assert.equal(checkOneOfTwo(correctAnswers, userAnswers), true);
    });

    it(`shold return false if first answer incorrect`, () => {
      const correctAnswers = [
        {type: `painting`},
      ];
      const userAnswers = {
        question1: `photo`,
      };
      assert.equal(checkOneOfTwo(correctAnswers, userAnswers), false);
    });
  });


  describe(`checkOneOfThree()`, () => {
    it(`shold return true if answer is correct`, () => {
      const correctAnswers = [
        {type: `painting`},
        {type: `photo`},
        {type: `photo`},
      ];
      const userAnswers = {
        question1: 0,
      };
      assert.equal(checkOneOfThree(correctAnswers, userAnswers), true);
    });

    it(`shold return false if answer is incorrect`, () => {
      const correctAnswers = [
        {type: `painting`},
        {type: `photo`},
        {type: `painting`},
      ];
      const userAnswers = {
        question1: 0,
      };
      assert.equal(checkOneOfThree(correctAnswers, userAnswers), false);
    });
  });


  describe(`getCorrectAnswer()`, () => {
    it(`shold return 3 from array [5, 3, 5]`, () => {
      const answers = [{type: `photo`}, {type: `photo`}, {type: `painting`}];
      const result = {index: 2, value: `painting`};
      assert.deepEqual(getCorrectAnswer(answers), result);
    });
  });


  describe(`getUniqueArrayElement()`, () => {
    it(`shold return 3 from array [5, 3, 5]`, () => {
      assert.deepEqual(getUniqueArrayElement([3, 5, 5]), {index: 0, value: 3});
      assert.deepEqual(getUniqueArrayElement([5, 2, 5]), {index: 1, value: 2});
      assert.deepEqual(getUniqueArrayElement([5, 5, 7]), {index: 2, value: 7});
    });
  });


  describe(`checkLives()`, () => {
    it(`should reduce live count by one, if last answer is wrong`, () => {
      const answerResult = `wrong`;
      const livesCount = 4;
      const newLivesCount = 3;
      assert.equal(checkLives(answerResult, livesCount), newLivesCount);
    });

    it(`should not change live count, if last answer is not wrong`, () => {
      const answerResult = `correct`;
      const livesCount = 4;
      const newLivesCount = 4;
      assert.equal(checkLives(answerResult, livesCount), newLivesCount);
    });
  });


  describe(`changeLevel()`, () => {
    it(`should return level index, increased by one`, () => {
      const levelIndex = 0;
      const newLevelIndex = 1;
      assert.deepEqual(changeLevel(levelIndex), newLevelIndex);
    });
  });


  describe(`checkResutls()`, () => {
    it(`should return full calculated score if lives > 0`, () => {
      const answerResults = [
        `fast`,
        `fast`,
        `slow`,
        `wrong`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
      ];
      const livesCount = 4;
      const score = {
        lives: {count: 4, points: 200},
        correct: {count: 9, points: 900},
        fast: {count: 2, points: 100},
        slow: {count: 1, points: -50},
        totalPoints: 1150,
        answerResults: [
          `fast`,
          `fast`,
          `slow`,
          `wrong`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
        ],
      };
      assert.deepEqual(adaptScore(answerResults, livesCount), score);
    });
    it(`should return short score if lives = 0`, () => {
      const answerResults = [
        `fast`,
        `fast`,
        `slow`,
        `wrong`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
        `correct`,
      ];
      const livesCount = 0;
      const shortScore = {
        lives: {count: 0},
        answerResults: [
          `fast`,
          `fast`,
          `slow`,
          `wrong`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
          `correct`,
        ],
      };
      assert.deepEqual(adaptScore(answerResults, livesCount), shortScore);
    });
  });

  describe(`getArrayUniqueElementsCount()`, () => {
    it(`should return object with each elements counts`, () => {
      const array = [
        `wrong`,
        `correct`,
        `correct`,
        `wrong`,
        `correct`,
        `correct`,
        `wrong`,
        `correct`,
        `correct`,
        `correct`,
      ];
      const uniqueElementsCount = {
        correct: 7,
        wrong: 3
      };
      assert.deepEqual(getArrayUniqueElementsCount(array), uniqueElementsCount);
    });
  });

});
