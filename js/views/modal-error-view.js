import AbstractView from '../abstract-view';

export default class RulesView extends AbstractView {
  constructor(status) {
    super();
    this._status = status;
  }
  get template() {
    return `
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">Статус: ${this._status}. Пожалуйста, перезагрузите страницу.</p>
        </div>
      </section>`;
  }
}
