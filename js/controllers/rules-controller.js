import {replaceScreenElements} from '../util';
import renderHeader from './header-controller';
import RulesView from '../views/rules-view';
import {startGame} from './data-controller';

export default () => {
  const header = renderHeader();
  const rulesView = new RulesView();

  let userName = ``;

  rulesView.onInput = (field, submitButton) => {
    userName = field.value;
    let isEmpty = userName.length === 0;
    submitButton.disabled = isEmpty;
  };

  rulesView.onSubmit = () => {
    startGame(userName);
  };

  replaceScreenElements(header, rulesView.element);
};
