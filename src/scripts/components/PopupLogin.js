import Popup from './Popup';
export class PopupLogin extends Popup {
  constructor(popupName) {
    super(popupName);
    this.form = this.popup.querySelector('#login-form');
  }

  open() {
    super.open();
    this.setSubmitListeners();
    this.popup.querySelectorAll('.popup__error-message').forEach((inputElement) => {
      inputElement.textContent = '';
    });
    //this.formValidator(this.form).setEventListeners();
  }

  close() {
    const spans = Array.from(this.popup.querySelectorAll('span'))
    spans.forEach((span) => {
      span.textContent = '';
    });
    super.close();
  }

  setSubmitListeners() {
    this.form.addEventListener('submit', this.register);
  }

}

