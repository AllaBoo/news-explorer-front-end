import '../styles/index.css';
import { loginPopup, messagePopup, registerPopup, loginButton, registerButton, loginButtonHeader, resultContainer, cardTemplate, searchForm, searchWord, resultSection, resultNotFound, resultLoading, resultTitle, resultMoreButton, resultError, messagePopupLoginButton, headerIcon } from './constants/constants'
import { PopupLogin } from './components/PopupLogin';
import { PopupRegister } from './components/PopupRegister';
import { PopupMessage } from './components/PopupMessage';
import { FormValidator } from './components/FormValidator';
import { Header } from './components/Header';
import { NewsApi } from './api/NewsApi';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';

const mainApi = new MainApi();
const header = new Header(mainApi);
const formValidator = (...arg) => new FormValidator(...arg);
const popupMessage = new PopupMessage(messagePopup);
const popupRegister = new PopupRegister(registerPopup, mainApi, popupMessage, formValidator);
const popupLogin = new PopupLogin(loginPopup, mainApi, header, formValidator);
const newsApi = new NewsApi();
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new CardList(resultContainer, cardTemplate, createCard, mainApi);


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

searchForm.addEventListener('submit', () => {
  event.preventDefault();
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  };
  resultSection.classList.remove('hidden');
  resultLoading.classList.remove('hidden');
  resultTitle.classList.add('hidden');
  resultMoreButton.classList.add('hidden');
  resultNotFound.classList.add('hidden');
  resultError.classList.add('hidden');

  newsApi.getNews(searchWord.value)
    .then((res) => {
      if (res.articles.length === 0) {
        return resultNotFound.classList.remove('hidden');
      } else {
        cardList.render(res.articles);
        resultTitle.classList.remove('hidden');
        resultMoreButton.classList.remove('hidden');
      }
    })
    .then(() => {
      resultContainer.classList.remove('hidden');
      resultLoading.classList.add('hidden');
    })
    .catch((err) => {
      resultError.classList.remove('hidden');
    })
});

resultMoreButton.addEventListener('click', () => cardList.renderMore());

headerIcon.addEventListener('click', () => header.openMenu());
header.render();