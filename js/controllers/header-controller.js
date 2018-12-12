import HeaderView from '../views/header-view.js';
import Application from '../application';

export default class HeaderController {

  constructor(barTemplate) {
    const headerView = new HeaderView(barTemplate);
    headerView.onClick = Application.showGreeting;
    this._element = headerView.element;
  }

  get element() {
    return this._element;
  }

}
