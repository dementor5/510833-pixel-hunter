import BarView from '../views/bar-view';
import HeaderController from './header-controller';
import StatsView from '../views/stats-view';
import TinderLikeController from './tinder-like-controller';
import OneOfThreeController from './one-of-three-controller';
import TwoOfTwoController from './two-of-two-controller';
import Application from '../application';

const ONE_SECOND = 1000;

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
      this._startTimer();
    } else {
      Application.showStats();
    }
  }

  _startTimer() {
    this._timer = setTimeout(() => {
      this._startTimer();
      this._model.tick();
      if (!this._model.checkTime()) {
        this._continueGame();
      }
      this._header.timerValue = this._model.game.time;
      if (this._model.game.timeEstimate === `warning`) {
        this._header.blinkTimer();
      }
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  _updateContent() {
    this._updateHeader();
    const newContent = this._newContent;
    this._root.replaceChild(newContent.element, this._content.element);
    this._content = newContent;
  }

  _updateHeader() {
    const newHeader = this._newHeader;
    this._root.replaceChild(newHeader.element, this._header.element);
    this._header = newHeader;
  }

  get _newHeader() {
    const game = this._model.game;
    const barView = new BarView(game.time, game.livesCount);
    const header = new HeaderController(barView.template);
    return header;
  }

  get _newContent() {
    const model = this._model;
    const statsView = new StatsView(model.game.answerResults);
    const continueGame = this._continueGame.bind(this);
    const content = new this._AnswerController(model.level, statsView.template, continueGame);
    return content;
  }

  get _AnswerController() {
    const type = this._model.level.type;

    let AnswerController;
    switch (type) {
      case `tinder-like`:
        AnswerController = TinderLikeController;
        break;
      case `one-of-three`:
        AnswerController = OneOfThreeController;
        break;
      case `two-of-two`:
        AnswerController = TwoOfTwoController;
        break;
      default:
        throw new Error(`Unknown current level type: ${type}`);
    }

    return AnswerController;
  }
}
