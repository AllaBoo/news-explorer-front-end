import '../styles/articles.css';

import { resultContainer, cardTemplate, headerIcon } from './constants/constants';
import { Header } from './components/Header';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';
import { ArticlesInfo } from './components/ArticlesInfo';

const mainApi = new MainApi();
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
