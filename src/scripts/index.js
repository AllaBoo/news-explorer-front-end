import '../styles/index.css';
import { loginPopup, registerPopup, messagePopup, loginButton, registerButton, loginButtonHeader, resultContainer, cardTemplate, searchForm, searchWord, resultSection, resultNotFound, resultLoading, resultTitle, resultMoreButton, resultError } from './constants/constants'
import { Popup } from './components/Popup';
import { NewsApi } from './api/NewsApi';

const popupRegister = new Popup(registerPopup);
const popupLogin = new Popup(loginPopup);
const popupMessage = new Popup(messagePopup);
import { Card } from './components/Card';
import { CardList } from './components/CardList';
const newsApi = new NewsApi();
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard).addCard(...arg);
const cardList = new CardList(resultContainer, cardTemplate, createCard, resultMoreButton);

loginButtonHeader.addEventListener('click', () => popupLogin.open());
registerButton.addEventListener('click', () => {
  popupLogin.close();
  popupRegister.open();
});
loginButton.addEventListener('click', () => {
  popupRegister.close();
  popupLogin.open();
});
const nextArr = [];
searchForm.addEventListener('submit', () => {
  event.preventDefault();
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  };
  resultSection.classList.remove('hidden');
  resultTitle.classList.add('hidden');
  resultMoreButton.classList.add('hidden');
  resultLoading.classList.remove('hidden');
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
    .catch(() => {
      resultError.classList.remove('hidden');
    })
});

document.querySelector('.result__button').addEventListener('click', () => cardList.renderMore());