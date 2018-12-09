import TwoOfTwoView from '../views/two-of-two-view';
import {continueGame} from './data-controller';

export default (level, statsTemplate) => {
  const twoOfTwoView = new TwoOfTwoView(level, statsTemplate);
  twoOfTwoView.onFormChange = (form) => {
    const formData = new FormData(form);
    const isFilled = formData.has(`question1`) && formData.has(`question2`);
    if (!isFilled) {
      return;
    }
    const answers = {
      question1: formData.get(`question1`),
      question2: formData.get(`question2`),
      time: 15,
    };
    continueGame(answers);
  };
  return twoOfTwoView.element;
};
