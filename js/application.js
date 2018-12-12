import GameModel from './game-model';
import IntroController from './controllers/intro-controller';
import GreetingController from './controllers/greeting-controller';
import RulesController from './controllers/rules-controller';
import GameController from './controllers/game-controller';
import ResultController from './controllers/result-controller';
import {changeScreen} from './util';

const gameModel = new GameModel();

export default class Application {

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
    gameModel.restart(userName);
    const gameController = new GameController(gameModel);
    changeScreen(gameController.element);
    gameController.startGame();
  }

  static showStats() {
    const resultController = new ResultController(gameModel);
    changeScreen(resultController.element);
  }

}
