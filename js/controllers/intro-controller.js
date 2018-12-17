import IntroView from '../views/intro-view';
import Application from '../application';

export default class IntroController {

  constructor() {
    const introView = new IntroView();
    introView.onClick = Application.showGreeting;
    this._element = introView.element;
  }

  get element() {
    return this._element;
  }

}
