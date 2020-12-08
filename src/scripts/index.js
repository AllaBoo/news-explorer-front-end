import '../styles/index.css';
import { loginPopup, messagePopup, registerPopup, loginButton, registerButton, loginButtonHeader, resultContainer, cardTemplate, searchForm, searchWord, resultMoreButton, messagePopupLoginButton, headerIcon, logoutButton } from './constants/constants'
import { newsApiServer, mainApiServer } from './config/config'
import { PopupLogin } from './components/PopupLogin';
import { PopupRegister } from './components/PopupRegister';
import { PopupMessage } from './components/PopupMessage';
import { FormValidator } from './components/FormValidator';
import { Header } from './components/Header';
import { NewsApi } from './api/NewsApi';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';
import { Result } from './components/Result';

const mainApi = new MainApi(mainApiServer);
const header = new Header(mainApi);
const formValidator = (...arg) => new FormValidator(...arg);
const popupMessage = new PopupMessage(messagePopup);
const popupRegister = new PopupRegister(registerPopup, mainApi, popupMessage, formValidator);
const popupLogin = new PopupLogin(loginPopup, mainApi, header, formValidator);
const newsApi = new NewsApi(newsApiServer);

const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);

const cardList = new CardList(resultContainer, cardTemplate, createCard, mainApi);
const result = new Result(newsApi, cardList);

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

searchForm.addEventListener('submit', () => result.searchNews(searchWord.value));

resultMoreButton.addEventListener('click', () => cardList.renderMore());

headerIcon.addEventListener('click', () => header.openMenu());
header.render();

logoutButton.addEventListener('click', () => {
  mainApi.signOut();
  window.location.reload();
});
