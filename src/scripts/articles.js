import '../styles/articles.css';

import { resultContainer, cardTemplate, headerIcon, logoutButton } from './constants/constants';
import { mainApiServer } from './config/config'
import { Header } from './components/Header';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';
import { ArticlesInfo } from './components/ArticlesInfo';

const mainApi = new MainApi(mainApiServer);
const header = new Header(mainApi);
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new CardList(resultContainer, cardTemplate, createCard, mainApi);
const articlesInfo = new ArticlesInfo(mainApi);

if (localStorage.getItem('token') === null) {
  window.location.href = 'http://localhost:8080';
}

mainApi.getInitialArticles()
  .then((res) => {
    const savedArticlesArr = res.data;
    articlesInfo.render(savedArticlesArr);
    cardList.renderSavedArticles(savedArticlesArr);
  })
  .catch(err => console.log(err));

headerIcon.addEventListener('click', () => header.openMenu());
header.render();

logoutButton.addEventListener('click', () => {
  mainApi.signOut();
  window.location.reload();
  window.location.href = 'http://localhost:8080';
});