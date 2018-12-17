import ModalConfirmView from '../views/modal-confirm-view';
import Application from '../application';
export default class ModalConfirmController {

  constructor() {
    const modalConfirmView = new ModalConfirmView();

    modalConfirmView.onConfirm = () => {
      modalConfirmView.close();
      Application.showGreeting();
    };

    this._element = modalConfirmView.element;
  }

  get element() {
    return this._element;
  }

}
