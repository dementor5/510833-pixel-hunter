import GreetingView from '../views/greeting-view';
import Application from '../application';

export default class GreetingController {

  constructor() {
    const greetingView = new GreetingView();
    greetingView.onClick = Application.showRules;
    this._element = greetingView.element;
  }

  get element() {
    return this._element;
  }

}
