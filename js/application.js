import GameModel from './game-model';
import Loader from './loader';
import ImagesLoader from './images-loader';
import IntroView from './views/intro-view';
import GreetingController from './controllers/greeting-controller';
import RulesController from './controllers/rules-controller';
import GameController from './controllers/game-controller';
import ResultController from './controllers/result-controller';
import ModalErrorView from './views/modal-error-view';
import ModalConfirmController from './controllers/modal-confirm-controller';
import {crossfadeChangeScreen, changeScreen, appendModal} from './util';

let gameModel = [];

export default class Application {

  static async start() {
    Application.showLoadScreen();
    try {
      const levels = await Loader.loadData();
      gameModel = new GameModel(levels);
      await new ImagesLoader(gameModel).loadImages();
      Application.showGreeting();
    } catch (e) {
      Application.showModalError(e);
    }
  }

  static showGreeting() {
    const greetingController = new GreetingController();
    crossfadeChangeScreen(greetingController.element);
  }

  static showRules() {
    const rulesController = new RulesController();
    changeScreen(rulesController.element);

  }

  static showGame(userName) {
    gameModel.startNewGame(userName);
    const gameController = new GameController(gameModel);
    changeScreen(gameController.element);
    gameController.startGame();
  }

  static async showStats() {
    Application.showLoadScreen();

    try {
      await Loader.saveResults(gameModel.gameResult, gameModel.userName);
      const scores = await Loader.loadResults(gameModel.userName);
      gameModel.adaptScores(scores);
      changeScreen(new ResultController(gameModel).element);
    } catch (e) {
      Application.showModalError(e);
    }
  }

  static showLoadScreen() {
    const introView = new IntroView();
    changeScreen(introView.element);
  }

  static showModalConfirm() {
    const modalConfirmController = new ModalConfirmController();
    appendModal(modalConfirmController.element);
  }

  static showModalError(error) {
    const modalErrorView = new ModalErrorView(error.message);
    appendModal(modalErrorView.element);
  }

}
