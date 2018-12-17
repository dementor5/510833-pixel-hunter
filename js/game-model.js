import {Rule} from './settings';
import {tick, resetTimer, checkTime, checkAnswer, checkLives, changeLevel, adaptScore} from './logic';

export default class GameModel {

  constructor(levels = []) {
    this._data = {
      levels,
      game: {},
      scores: [],
    };
  }

  startNewGame(userName) {
    this._data.game = {
      userName,
      livesCount: Rule.INITIAL_LIVE_COUNT,
      levelIndex: 0,
      time: 0,
      lastAnswer: {},
      timeEstimate: ``,
      answerResults: new Array(this.levels.length).fill(`unknown`),
    };
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
    return this.game.livesCount > 0 && this.levelIsNotLast;
  }

  get game() {
    return this._data.game;
  }

  get userName() {
    return this.game.userName;
  }

  get gameResult() {
    return {
      livesCount: this.game.livesCount,
      answerResults: this.game.answerResults,
    };
  }

  get scores() {
    return this._data.scores;
  }

  set game(game) {
    this.game = game;
  }

  tick() {
    this.game.time = tick(this.game.time);
  }

  resetTimer() {
    this.game.time = resetTimer();
  }

  checkTime() {
    this.game.timeEstimate = checkTime(this.game.time);
    return this.game.timeEstimate;
  }

  checkAnswer(userAnswer) {
    this.game.lastAnswer = userAnswer;
    const newAnswerResults = this.game.answerResults.slice();
    const checkResult = checkAnswer(userAnswer, this.level, this.game.timeEstimate);
    newAnswerResults[this.game.levelIndex] = checkResult;

    this.game.answerResults = newAnswerResults;
    this.game.livesCount = checkLives(checkResult, this.game.livesCount);
  }

  changeLevel() {
    const newLevelIndex = changeLevel(this.game.levelIndex);
    this.game.levelIndex = newLevelIndex;
  }

  adaptScores(scores) {
    this._data.scores = scores.map((score) => {
      return adaptScore(score.answerResults, score.livesCount);
    });
  }

}
