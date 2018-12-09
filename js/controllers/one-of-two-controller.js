import OneOfTwoView from '../views/one-of-two-view';
import {continueGame} from './data-controller';

export default (level, statsTemplate) => {
  const oneOfTwoView = new OneOfTwoView(level, statsTemplate);
  oneOfTwoView.onFormChange = (form) => {
    const formData = new FormData(form);
    if (formData.has(`question1`)) {
      const answers = {
        question1: formData.get(`question1`),
        time: 15
      };
      continueGame(answers);
    }
  };
  return oneOfTwoView.element;
};
