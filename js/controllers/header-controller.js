import HeaderView from '../views/header-view.js';
import {greeting} from './data-controller';

export default (barTemplate = ``) => {
  const headerView = new HeaderView(barTemplate);
  headerView.onClick = greeting;
  return headerView.element;
};
