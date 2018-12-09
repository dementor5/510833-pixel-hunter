import IntroView from '../views/intro-view';
import {greeting} from './data-controller';
import {replaceScreenElements} from '../util';

export default () => {
  const introView = new IntroView();
  introView.onClick = greeting;
  replaceScreenElements(introView.element);
};
