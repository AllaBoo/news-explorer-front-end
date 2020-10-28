import '../styles/articles.css';

import {
  loginPopup, messagePopup, registerPopup, loginButton, registerButton, loginButtonHeader,
  resultContainer, cardTemplate, messagePopupLoginButton, headerIcon,
} from './constants/constants';
import { PopupLogin } from './components/PopupLogin';
import { PopupRegister } from './components/PopupRegister';
import { PopupMessage } from './components/PopupMessage';
import { Header } from './components/Header';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';

const mainApi = new MainApi();
const header = new Header(mainApi);
const popupMessage = new PopupMessage(messagePopup);
const popupRegister = new PopupRegister(registerPopup, mainApi, popupMessage);
const popupLogin = new PopupLogin(loginPopup, mainApi, header);
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new CardList(resultContainer, cardTemplate, createCard, mainApi);


cardList.renderSavedArticles();

loginButtonHeader.addEventListener('click', () => {
  header.closeMenu();
  popupLogin.open();
});
registerButton.addEventListener('click', () => {
  popupLogin.close();
  popupRegister.open();
});
loginButton.addEventListener('click', () => {
  popupRegister.close();
  popupLogin.open();
});
messagePopupLoginButton.addEventListener('click', () => {
  popupMessage.close();
  popupLogin.open();
});

headerIcon.addEventListener('click', () => header.openMenu());
header.render();
