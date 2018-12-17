import HeaderController from './header-controller';
import RulesView from '../views/rules-view';
import Application from '../application';

export default class RulesController {

  constructor() {
    const headerController = new HeaderController();
    const rulesView = new RulesView();
    let userName = ``;

    rulesView.onInput = (field, submitButton) => {
      userName = field.value;
      let isEmpty = userName.length === 0;
      submitButton.disabled = isEmpty;
    };

    rulesView.onSubmit = () => {
      Application.showGame(userName);
    };

    this._root = document.createElement(`div`);
    this._root.appendChild(headerController.element);
    this._root.appendChild(rulesView.element);
  }

  get element() {
    return this._root;
  }

}
