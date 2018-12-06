import {assert} from 'chai';
import {
  checkTwoOfTwo,
  checkOneOfTwo,
  checkOneOfThree,
  getCorrectAnswer,
  getUniqueArrayElement,
  checkTime,
  changeLevel,
  checkLives,
  checkResults,
  getArrayUniqueElementsCount,
} from '../logic.js';


describe(`logic.test.js`, () => {
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


  describe(`checkTime()`, () => {
    const Rule = {
      FAST_ANSWER_TIME: 10,
      SLOW_ANSWER_TIME: 20,
    };
    it(`shold return 'fast' if time to answer on question < 10`, () => {
      const time = 8;
      assert.equal(checkTime(time, Rule), `fast`);
    });
    it(`shold return 'slow' if time to answer on question > 20`, () => {
      const time = 22;
      assert.equal(checkTime(time, Rule), `slow`);
    });
    it(`shold return 'correct' if time to answer on question >= 10 and <= 20`, () => {
      const time = 15;
      assert.equal(checkTime(time, Rule), `correct`);
    });
    it(`argument should not be a non number vaule`, () => {
      const time = `some string`;
      assert.throws(() => checkTime(time, Rule), `time should be of type number`);
    });

    it(`argument should not be negative value`, () => {
      const time = -10;
      assert.throws(() => checkTime(time, Rule), `time should not be negative value`);
    });
  });


  describe(`checkLives()`, () => {
    it(`should reduce live count by one, if last answer id wrong`, () => {
      const game = {
        lives: {count: 3},
        answerResults: [`correct`, `wrong`],
      };
      const newGame = {
        lives: {count: 2},
        answerResults: [`correct`, `wrong`],
      };
      assert.deepEqual(checkLives(game), newGame);
    });

    it(`should not change live count, if last answer is not wrong`, () => {
      const game = {
        lives: {count: 3},
        answerResults: [`wrong`, `correct`],
      };
      const newGame = {
        lives: {count: 3},
        answerResults: [`wrong`, `correct`],
      };
      assert.deepEqual(checkLives(game), newGame);
    });
  });


  describe(`changeLevel()`, () => {
    it(`should return same object with level property increased on one`, () => {
      const game = {
        currentLevelIndex: 0,
        lives: {count: 4}
      };
      const levels = [{}, {}, {}];
      const newGame = {
        currentLevelIndex: 1,
        lives: {count: 4},
      };
      assert.deepEqual(changeLevel(game, levels), newGame);
    });
  });


  describe(`checkResutls()`, () => {
    it(`should`, () => {
      const game = {
        lives: {count: 4},
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
      const rules = {
        PER_LIVE_AWARD: 50,
        CORRECT_ANSWER_AWARD: 100,
        FAST_ANSWER_AWARD: 50,
        SLOW_ANSWER_PENALTY: 50,
      };
      const gameResult = {
        lives: {count: 4, points: 200},
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
        correctAnswers: 9,
        correctAnswerPoints: 900,
        fast: {count: 2, points: 100},
        slow: {count: 1, points: -50},
        totalPoints: 1150,
      };
      assert.deepEqual(checkResults(game, rules), gameResult);
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

