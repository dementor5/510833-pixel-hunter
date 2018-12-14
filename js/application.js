import GameModel from './game-model';
import Loader from './loader';
import IntroController from './controllers/intro-controller';
import GreetingController from './controllers/greeting-controller';
import RulesController from './controllers/rules-controller';
import GameController from './controllers/game-controller';
import ResultController from './controllers/result-controller';
import {changeScreen} from './util';

let gameModel = {};

export default class Application {

  static start() {
    Loader.loadData().then((data) => {
      gameModel = new GameModel(data);
    })
    .then(Application.showIntro);
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
    const resultController = new ResultController(gameModel);
    changeScreen(resultController.element);
  }

}
