import TinderLikeView from '../views/tinder-like-view';

export default (level, statsTemplate, continueGame) => {
  const oneOfTwoView = new TinderLikeView(level, statsTemplate);

  oneOfTwoView.onAnswer = (form) => {
    const formData = new FormData(form);

    if (!formData.has(`question1`)) {
      return;
    }

    const answer = {question1: formData.get(`question1`)};

    continueGame(answer);
  };

  return oneOfTwoView;
};
