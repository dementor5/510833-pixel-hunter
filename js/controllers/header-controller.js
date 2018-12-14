import HeaderView from '../views/header-view.js';
import Application from '../application';

export default class HeaderController {

  constructor(barTemplate) {
    this._headerView = new HeaderView(barTemplate);
    this._headerView.onClick = Application.showGreeting;
    this._element = this._headerView.element;
  }

  get element() {
    return this._element;
  }

  set timerValue(time) {
    this._headerView.timerValue = time;
  }

  blinkTimer() {
    this._headerView.blinkTimer();
  }

}
