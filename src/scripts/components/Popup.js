export default class Popup {
  constructor(popupName) {
    this.popup = popupName;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    this._setListeners();
    document.querySelector('.body').append(this.popup);
  }

  clearForm() {
    this.popup.querySelectorAll('.popup__error-message').forEach((inputElement) => {
      inputElement.textContent = '';
    });
    this.popup.querySelectorAll('.popup__input').forEach((inputElement) => {
      inputElement.value = '';
    });
  }

  close() {
    this.popup.closest('.popup').classList.remove('popup_opened');
  }

  _setListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

}
