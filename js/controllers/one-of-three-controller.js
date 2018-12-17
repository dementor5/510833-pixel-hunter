import OneOfThreeView from '../views/one-of-three-view';

export default class OneOfThreeController {

  constructor(level, statsTemplate, continueGame) {
    const oneOfThreeView = new OneOfThreeView(level, statsTemplate);

    oneOfThreeView.onClick = (target) => {
      if (!target.alt) {
        return;
      }
      const imageNumber = target.alt[target.alt.length - 1];
      const answerIndex = imageNumber - 1;
      const answers = {question1: answerIndex};
      continueGame(answers);
    };

    this._element = oneOfThreeView.element;
  }

  get element() {
    return this._element;
  }

}
