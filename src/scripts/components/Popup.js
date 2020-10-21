export class Popup {
  constructor(popupName) {
    this.popup = popupName;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    this.setListeners();
    document.querySelector('.body').append(this.popup);
  }

  close() {
    this.popup.closest('.popup').classList.remove('popup_opened');
  }

  setListeners() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

}
