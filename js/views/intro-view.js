import AbstractView from '../abstract-view';

export default class IntroView extends AbstractView {
  get template() {
    return `
      <section class="intro">
        <div class="intro__asterisk asterisk"><span class="visually-hidden">Идёт загрузка</span>*</div>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }
}

