import BarView from '../views/bar-view';
import HeaderController from './header-controller';
import StatsView from '../views/stats-view';
import tinderLike from './tinder-like-controller';
import initOneOfThree from './one-of-three-controller';
import initTwoOfTwo from './two-of-two-controller';
import ONE_SECOND from '../constants';
import Application from '../application';

export default class GameController {
  constructor(model) {
    this._model = model;
    this._header = this._newHeader;
    this._content = this._newContent;

    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._content.element);
  }

  get element() {
    return this._root;
  }

  startGame() {
    this._startTimer();
  }

  _continueGame(userAnswer) {
    this._stopTimer();
    const model = this._model;
    model.checkAnswer(userAnswer);
    this._model.resetTimer();

    if (model.canContinue) {
      model.changeLevel();
      this._updateContent();
      this.startGame();
    } else {
      model.checkResults();
      Application.showStats();
    }
  }

  _updateContent() {
    this._updateHeader();
    const newContent = this._newContent;
    this._root.replaceChild(newContent.element, this._content.element);
    this._content = newContent;
  }

  _startTimer() {
    this._timer = setTimeout(() => {
      this._model.tick();
      this._updateHeader();
      this._startTimer();
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  _updateHeader() {
    const newHeader = this._newHeader;
    this._root.replaceChild(newHeader.element, this._header.element);
    this._header = newHeader;
  }

  get _newHeader() {
    const game = this._model.game;
    const barView = new BarView(game.time, game.lives.count);
    const header = new HeaderController(barView.template);
    return header;
  }

  get _newContent() {
    const model = this._model;
    const statsView = new StatsView(model.game.answerResults, model.levels.length);
    const continueGame = this._continueGame.bind(this);
    const content = this._createContent(model.level, statsView.template, continueGame);
    return content;
  }

  get _createContent() {
    const type = this._model.level.type;

    let createContent;
    switch (type) {
      case `tinder-like`:
        createContent = tinderLike;
        break;
      case `one-of-three`:
        createContent = initOneOfThree;
        break;
      case `two-of-two`:
        createContent = initTwoOfTwo;
        break;
      default:
        throw new Error(`Unknown current level type: ${type}`);
    }

    return createContent;
  }
}
