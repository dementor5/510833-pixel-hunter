import GreetingView from '../views/greeting-view';
import {rules} from './data-controller';
import {replaceScreenElements} from '../util';

export default () => {
  const greetingView = new GreetingView();
  greetingView.onClick = rules;
  replaceScreenElements(greetingView.element);
};
