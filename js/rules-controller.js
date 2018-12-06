import {render, changeScreen} from './util.js';
import renderRulesScreen from './rules-view.js';
import renderHeader from './header-view.js';

export default () => {
  const header = renderHeader();
  const rulesScreen = renderRulesScreen();

  const container = render();
  container.appendChild(header);
  container.appendChild(rulesScreen);
  changeScreen(container);
};
