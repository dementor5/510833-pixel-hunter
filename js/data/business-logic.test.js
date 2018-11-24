import {assert} from 'chai';
import {calculatePoints, reduceLivesCount, changeScreen, checkTime} from '../business-logic.js';

describe(`business-logic.test.js`, () => {
  describe(`calculatePoints()`, () => {
    const answers = [
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
      {correct: true, time: 9},
    ];
    const liveCount = 0;

    it(`should return -1: number of correct answers < 10`, () => {
      const answers2 = [
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
      ];
      const livesCount2 = 3;
      assert.equal(calculatePoints(answers2, livesCount2), -1);
    });

    it(`should return 1150: all correct answers each for normal time and 3 lives`, () => {
      const answers2 = [
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
        {correct: true, time: 15},
      ];
      const liveCount2 = 3;
      assert.equal(calculatePoints(answers2, liveCount2), 1150);
    });

    it(`should return 650: all correct answrers, each for long time, 3 lives`, () => {
      const answers2 = [
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
        {correct: true, time: 21},
      ];
      const liveCount2 = 3;
      assert.equal(calculatePoints(answers2, liveCount2), 650);
    });

    it(`should return 1650: all correct answrers, each for short time, 3 lives`, () => {
      const answers2 = [
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
      ];
      const liveCount2 = 3;
      assert.equal(calculatePoints(answers2, liveCount2), 1650);
    });

    it(`should return 1500: all correct answrers, each for short time, 0 lives`, () => {
      const answers2 = [
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
        {correct: true, time: 9},
      ];
      const liveCount2 = 0;
      assert.equal(calculatePoints(answers2, liveCount2), 1500);
    });

    it(`should not allow set non object value for answers`, () => {
      assert.throws(() => calculatePoints(`some string`, liveCount), `answers should be of type object`);
    });

    it(`should not allow set non number value for liveCount`, () => {
      assert.throws(() => calculatePoints(answers, `some string`), `liveCount should be of type number`);
    });

    it(`liveCount should not be negative value`, () => {
      assert.throws(() => calculatePoints(answers, -1), `liveCount should not be negative value`);
    });
  });

  describe(`checkLives()`, () => {
    it(`should reduce livesCount on 1 by calling`, () => {
      const livesCount = 3;
      assert.equal(reduceLivesCount(livesCount), 2);
    });
  });

  describe(`changeLevel()`, () => {
    it(`should return 2 if in arguments 1`, () => {
      const currentScreen = 1;
      assert.equal(changeScreen(currentScreen), 2);
    });
  });

  describe(`checkTime()`, () => {
    it(`shold return 'fast' if time to answer on question < 10`, () => {
      const time = 8;
      assert.equal(checkTime(time), `fast`);
    });
    it(`shold return 'slow' if time to answer on question > 20`, () => {
      const time = 22;
      assert.equal(checkTime(time), `slow`);
    });
    it(`argument should not be a non number vaule`, () => {
      const time = `some string`;
      assert.throws(() => checkTime(time), `time should be of type number`);
    });

    it(`argument should not be negative value`, () => {
      const time = -10;
      assert.throws(() => checkTime(time), `time should not be negative value`);
    });
  });
});

