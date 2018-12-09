import {INITIAL_GAME} from '../constants';
import getLevels from '../mockup-data';
import {checkAnswers, checkLives, changeLevel, checkResults} from '../logic';
import showIntroScreen from './intro-controller';
import showGreetinScreen from './greeting-controller';
import showRulesScreen from './rules-controller';
import showGameScreen from './game-controller';
import showResultScreen from './result-controller';

const gameData = Object.assign({}, INITIAL_GAME, {levels: getLevels()});

export function intro() {
  showIntroScreen();
}

export function greeting() {
  showGreetinScreen();
}

export function rules() {
  showRulesScreen();
}

export function startGame(userName) {
  gameData.games.unshift({
    userName,
    currentLevelIndex: 0,
    currentLevelAnswers: {},
    lives: {count: INITIAL_GAME.rules.INITIAL_LIVE_COUNT},
    answerResults: [],
  });
  showGameScreen(gameData.games[0], gameData.levels);
}

export function continueGame(answers) {
  gameData.games[0].currentLevelAnswers = answers;
  gameData.games[0] = checkAnswers(gameData.games[0], gameData.levels, gameData.rules);
  gameData.games[0] = checkLives(gameData.games[0]);

  let success = true;
  try {
    gameData.games[0] = changeLevel(gameData.games[0], gameData.levels);
  } catch (e) {
    if (e.message === `you are dead` || e.message === `allready last level`) {
      success = false;
    } else {
      throw e;
    }
  }
  if (success) {
    showGameScreen(gameData.games[0], gameData.levels);
  } else {
    gameData.games[0] = checkResults(gameData.games[0], gameData.rules);
    const levelsAmount = gameData.levels.length;
    showResultScreen(gameData.games, levelsAmount, gameData.rules);
  }
}
