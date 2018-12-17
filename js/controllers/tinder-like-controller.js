import TinderLikeView from '../views/tinder-like-view';

export default class TinderLikeController {

  constructor(level, statsTemplate, continueGame) {
    const oneOfTwoView = new TinderLikeView(level, statsTemplate);

    oneOfTwoView.onAnswer = (form) => {
      const formData = new FormData(form);
      if (!formData.has(`question1`)) {
        return;
      }
      const answer = {question1: formData.get(`question1`)};
      continueGame(answer);
    };

    this._element = oneOfTwoView.element;
  }

  get element() {
    return this._element;
  }

}
