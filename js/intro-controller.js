import {changeScreen} from './util.js';
import renderIntro from './intro-view.js';

export default () => {
  const introEl = renderIntro();
  changeScreen(introEl);
};
