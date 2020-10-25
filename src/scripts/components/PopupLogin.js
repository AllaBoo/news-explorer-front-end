import Popup from './Popup';
export class PopupLogin extends Popup {
  constructor(popupName, api, articleLink) {
    super(popupName);
    this.form = this.popup.querySelector('#login-form');
    this.mail = this.form.querySelector('#mail');
    this.password = this.form.querySelector('#password');
    this.api = api;
    this.articleLink = articleLink;
  }

  open() {
    super.open();
    super.clearForm();
    this.setSubmitListeners();
    //this.formValidator(this.form).setEventListeners();
  }

  login = (event) => {
    event.preventDefault();
    const loginData = {
      email: this.mail.value,
      password: this.password.value,
    };
    console.log('данные из попапа');
    console.log(loginData);
    //this.formValidator(this.form).checkFormValid();
    this.api.signIn(loginData)
      .then(() => {
        super.close();
        this.articleLink.classList.remove('hidden');
      })
      .catch((err) => {
        this.popup.querySelector('.popup__error-message_centred').textContent = err.message;
      })
  }

  setSubmitListeners() {
    this.form.addEventListener('submit', this.login);
  }

}

