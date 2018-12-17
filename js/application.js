import GameModel from './game-model';
import LoadingIndicatorView from './views/loading-indicator-view';
import Loader from './loader';
import IntroController from './controllers/intro-controller';
import GreetingController from './controllers/greeting-controller';
import RulesController from './controllers/rules-controller';
import GameController from './controllers/game-controller';
import ResultController from './controllers/result-controller';
import ModalErrorView from './views/modal-error-view';
import ModalConfirmController from './controllers/modal-confirm-controller';
import {changeScreen, appendModal} from './util';

let gameModel = [];

export default class Application {

  static start() {
    const loadingIndicatorView = new LoadingIndicatorView();
    changeScreen(loadingIndicatorView.element);

    Loader.loadData()
      .then((levels) => {
        gameModel = new GameModel(levels);
      })
      .then(() => loadingIndicatorView.stop())
      .then(Application.showIntro)
      .catch(Application.showModalError);
  }

  static showIntro() {
    const introController = new IntroController();
    changeScreen(introController.element);
  }

  static showGreeting() {
    const greetingController = new GreetingController();
    changeScreen(greetingController.element);
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

  static showStats() {
    const resultController = new ResultController();
    changeScreen(resultController.element);

    Loader.saveResults(gameModel.gameResult, gameModel.userName)
      .then(() => Loader.loadResults(gameModel.userName))
      .then((scores) => gameModel.adaptScores(scores))
      .then(() => resultController.showResults(gameModel))
      .catch(Application.showModalError);
  }

  static showModalError(error) {
    const modalErrorView = new ModalErrorView(error.message);
    appendModal(modalErrorView.element);
  }

  static showModalConfirm() {
    const modalConfirmController = new ModalConfirmController();
    appendModal(modalConfirmController.element);
  }

}
