import {getElementFromTemplate, changeScreen} from './util.js';
import greetingEl from './greeting.js';

const template =
`<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;
const element = getElementFromTemplate(template);
const button = element.querySelector(`.intro__asterisk`);

button.addEventListener(`click`, () => changeScreen(greetingEl));

export default element;
