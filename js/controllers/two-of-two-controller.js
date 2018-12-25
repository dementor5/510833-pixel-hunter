import TwoOfTwoView from '../views/two-of-two-view';

const FIRST_INPUT_NAME = `question1`;
const SECOND_INPUT_NAME = `question2`;

export default class TwoOfTwoController {

  constructor(level, statsTemplate, continueGame) {
    const twoOfTwoView = new TwoOfTwoView(level, statsTemplate);

    twoOfTwoView.onFormChange = (form) => {
      const formData = new FormData(form);
      const isFilled = formData.has(FIRST_INPUT_NAME) && formData.has(SECOND_INPUT_NAME);
      if (!isFilled) {
        return;
      }
      const answers = {
        question1: formData.get(FIRST_INPUT_NAME),
        question2: formData.get(SECOND_INPUT_NAME),
      };
      continueGame(answers);
    };

    this._element = twoOfTwoView.element;
  }

  get element() {
    return this._element;
  }

}
