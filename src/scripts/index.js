import '../styles/index.css';
import { loginPopup, registerPopup, messagePopup, loginButton, registerButton, loginButtonHeader } from './constants/constants'
import { Popup } from './components/Popup';

const popupRegister = new Popup(registerPopup);
const popupLogin = new Popup(loginPopup);
const popupMessage = new Popup(messagePopup);

loginButtonHeader.addEventListener('click', () => popupLogin.open());
registerButton.addEventListener('click', () => {
  popupLogin.close();
  popupRegister.open();
});
loginButton.addEventListener('click', () => {
  popupRegister.close();
  popupLogin.open();
});
