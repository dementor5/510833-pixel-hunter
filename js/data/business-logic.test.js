import {assert} from 'chai';
import {sumUpResult} from '../business-logic.js';

const answers1 = [
  {correct: true, time: 15},
  {correct: true, time: 15},
  {correct: true, time: 15},
  {correct: true, time: 15}
];
const liveCount1 = 0;

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

const answers3 = [
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
const liveCount3 = 3;

const answers4 = [
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
const liveCount4 = 3;

const answers5 = [
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
const liveCount5 = 0;

describe(`business-logic.test.js`, () => {
  describe(`sumUpResult()`, () => {
    it(`should return -1: number of correct answers < 10`, () => {
      assert.equal(-1, sumUpResult(answers1, liveCount1));
    });

    it(`should return 1150: all correct answers each for normal time and 3 lives`, () => {
      assert.equal(sumUpResult(answers2, liveCount2), 1150);
    });

    it(`should return 650: all correct answrers, each for long time, 3 lives`, () => {
      assert.equal(sumUpResult(answers3, liveCount3), 650);
    });

    it(`should return 1650: all correct answrers, each for short time, 3 lives`, () => {
      assert.equal(sumUpResult(answers4, liveCount4), 1650);
    });

    it(`should return 1500: all correct answrers, each for short time, 0 lives`, () => {
      assert.equal(sumUpResult(answers5, liveCount5), 1500);
    });

    it(`should not allow set non object value for answers`, () => {
      assert.throws(() => sumUpResult(`some string`, liveCount5), `answers should be of type object`);
    });

    it(`should not allow set non number value for liveCount`, () => {
      assert.throws(() => sumUpResult(answers5, `some string`), `liveCount should be of type number`);
    });

    it(`liveCount should not be negative value`, () => {
      assert.throws(() => sumUpResult(answers5, -1), `liveCount should not be negative value`);
    });
  });
});

