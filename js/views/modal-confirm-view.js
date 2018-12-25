import AbstractView from '../abstract-view';

const ESCAPE_KEYBOARD_BUTTON = `Escape`;

export default class modalConfirmView extends AbstractView {

  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn modal__btn--ok">Ок</button>
            <button class="modal__btn modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>`;
  }

  bind() {
    this._element.addEventListener(`click`, (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
      if (evt.target.tagName === `BUTTON`) {
        evt.preventDefault();
        if (evt.target.classList.contains(`modal__btn--ok`)) {
          this.onConfirm();
        }
        if (evt.target.classList.contains(`modal__btn--cancel`)) {
          this.close();
        }
        if (evt.target.classList.contains(`modal__close`)) {
          this.close();
        }
      }
    });

    this._onEscPressBinded = this._onEscPress.bind(this);
    document.addEventListener(`keydown`, this._onEscPressBinded);
  }

  _onEscPress(evt) {
    if (evt.code === ESCAPE_KEYBOARD_BUTTON) {
      this.close();
    }
  }

  close() {
    document.removeEventListener(`keydown`, this._onEscPressBinded);
    this._element.remove();
  }

  onConfirm() {}

}
