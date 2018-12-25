import {createElementWith} from '../util.js';
import HeaderController from './header-controller';
import RulesView from '../views/rules-view';
import Application from '../application';

export default class RulesController {

  constructor() {
    const headerController = new HeaderController();
    this._rulesView = new RulesView();

    this._rulesView.onSubmit = (userName) => {
      Application.showGame(userName);
    };

    this._root = createElementWith(headerController.element, this._rulesView.element);
  }

  get element() {
    return this._root;
  }

  focusNameField() {
    this._rulesView.focusNameField();
  }

}
