import {changeScreen} from './util.js';
import renderGreeting from './greeting-view.js';

export default () => {
  const greetingScreen = renderGreeting();
  changeScreen(greetingScreen);
};
