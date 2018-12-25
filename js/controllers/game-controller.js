import {createElementWith} from '../util.js';
import BarView from '../views/bar-view';
import HeaderController from './header-controller';
import StatsView from '../views/stats-view';
import {LevelType, TimeEstimate} from '../settings';
import TinderLikeController from './tinder-like-controller';
import OneOfThreeController from './one-of-three-controller';
import TwoOfTwoController from './two-of-two-controller';
import Application from '../application';

const ONE_SECOND = 1000;

export default class GameController {
  constructor(model) {
    this._model = model;
    this._header = this._getNewHeader();
    this._content = this._getNewContent();
    this._root = createElementWith(this._header.element, this._content.element);
  }

  get element() {
    return this._root;
  }

  startGame() {
    this._startTimer();
  }

  _continueGame(userAnswer) {
    this._stopTimer();
    this._model.checkAnswer(userAnswer);
    this._model.resetTimer();

    if (this._model.canContinue) {
      this._model.changeLevel();
      this._updateContent();
      this.startGame();
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
      this._header.timerValue = this._model.reminedTime;
      if (this._model.game.timeEstimate === TimeEstimate.WARNING) {
        this._header.blinkTimer();
      }
    }, ONE_SECOND);
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  _updateContent() {
    this._updateHeader();
    const newContent = this._getNewContent();
    this._root.replaceChild(newContent.element, this._content.element);
    this._content = newContent;
  }

  _updateHeader() {
    const newHeader = this._getNewHeader();
    this._root.replaceChild(newHeader.element, this._header.element);
    this._header = newHeader;
  }

  _getNewHeader() {
    const barView = new BarView(this._model.reminedTime, this._model.game.livesCount);
    const header = new HeaderController(barView.template);
    return header;
  }

  _getNewContent() {
    const statsView = new StatsView(this._model.game.answerResults);
    const continueGame = this._continueGame.bind(this);
    const AnswerController = this._getAnswerController();
    const content = new AnswerController(this._model.level, statsView.template, continueGame);
    return content;
  }

  _getAnswerController() {
    const type = this._model.level.type;

    let AnswerController = null;
    switch (type) {
      case LevelType.TINDER_LIKE:
        AnswerController = TinderLikeController;
        break;
      case LevelType.ONE_OF_THREE:
        AnswerController = OneOfThreeController;
        break;
      case LevelType.TWO_OF_TWO:
        AnswerController = TwoOfTwoController;
        break;
      default:
        throw new Error(`Unknown current level type: ${type}`);
    }

    return AnswerController;
  }
}
