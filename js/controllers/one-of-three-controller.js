import OneOfThreeView from '../views/one-of-three-view';
import {continueGame} from './data-controller';

export default (level, statsTemplate) => {
  const oneOfThreeView = new OneOfThreeView(level, statsTemplate);
  oneOfThreeView.onClick = (target) => {
    if (!target.alt) {
      return;
    }
    const imageNumber = target.alt[target.alt.length - 1];
    const answerIndex = imageNumber - 1;
    const answers = {
      question1: answerIndex,
      time: 15,
    };
    continueGame(answers);
  };
  return oneOfThreeView.element;
};
