import TinderLikeView from '../views/tinder-like-view';

const INPUTS_FIELD_NAME = `question1`;

export default class TinderLikeController {

  constructor(level, statsTemplate, continueGame) {
    const oneOfTwoView = new TinderLikeView(level, statsTemplate);

    oneOfTwoView.onAnswer = (form) => {
      const formData = new FormData(form);
      if (!formData.has(INPUTS_FIELD_NAME)) {
        return;
      }
      const answer = {question1: formData.get(INPUTS_FIELD_NAME)};
      continueGame(answer);
    };

    this._element = oneOfTwoView.element;
  }

  get element() {
    return this._element;
  }

}
