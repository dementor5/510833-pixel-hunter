import {Rule} from './settings';
import getLevels from './mockup-data';
import {checkAnswer, checkLives, changeLevel, checkResults, tick, resetTimer} from './logic';

export default class GameModel {

  constructor() {
    this._data = {
      levels: getLevels(),
      games: [],
    };
  }

  restart(userName) {
    this._data.games.unshift({
      userName,
      levelIndex: 0,
      lastAnswer: {},
      time: 0,
      answerResults: [],
      lives: {count: Rule.INITIAL_LIVE_COUNT, points: null},
      correct: {count: null, points: null},
      fast: {count: null, points: null},
      slow: {count: null, points: null},
      totalPoints: null,
    });
  }

  get level() {
    return Object.freeze(this.levels[this.game.levelIndex]);
  }

  get levels() {
    return this._data.levels;
  }

  get levelIsNotLast() {
    const currentLevelNumber = this.game.levelIndex + 1;
    return currentLevelNumber !== this.levels.length;
  }

  get canContinue() {
    return this.game.lives.count > 0 && this.levelIsNotLast;
  }

  get game() {
    return this.games[0];
  }

  get games() {
    return this._data.games;
  }

  set game(game) {
    this.games[0] = game;
  }

  checkAnswer(userAnswer) {
    this.game.lastAnswer = userAnswer;
    const newAnswerResults = this.game.answerResults.slice();
    const checkResult = checkAnswer(userAnswer, this.level, this.game.time);
    newAnswerResults.push(checkResult);

    this.game.answerResults = newAnswerResults;
    this.game.lives.count = checkLives(checkResult, this.game.lives.count);
  }

  changeLevel() {
    const newLevelIndex = changeLevel(this.game.levelIndex);
    this.game.levelIndex = newLevelIndex;
  }

  checkResults() {
    const result = checkResults(this.game);
    this.game = Object.assign(this.game, result);
  }

  tick() {
    this.game.time = tick(this.game.time);
  }

  resetTimer() {
    this.game.time = resetTimer();
  }

}
