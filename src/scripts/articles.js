import '../styles/articles.css';

import {
  loginPopup, messagePopup, registerPopup, loginButton, registerButton, loginButtonHeader,
  resultContainer, cardTemplate, messagePopupLoginButton, headerIcon, firstTagSpan, secondTagSpan, tagAmountSpan
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

mainApi.getUser()
  .then((res) => {
    document.querySelector('#user-greeting').textContent = res.name;
  });

mainApi.getInitialArticles()
  .then((res) => {
    const savedArticlesArr = res.data;
    const articlesCaption = document.querySelector('#articles-caption')
    document.querySelector('#articles-amount').textContent = savedArticlesArr.length;
    const keywordsArr = [];
    // создаём массив ключевых слов, выдранных из объекта со статьями
    savedArticlesArr.forEach(article => {
      keywordsArr.push(article.keyword);
    });
    // создадим объект, содержащий ключевое слово и количество повторений
    const keywordsObj = keywordsArr.reduce(function (prevVal, item) {
      if (!prevVal[item]) {
        // если ключа ещё нет в объекте, значит это первое повторение
        prevVal[item] = 1;
      } else {
        // иначе увеличим количество повторений на 1
        prevVal[item] += 1;
      }
      // и вернём изменённый объект
      return prevVal;
    }, {}); // Начальное значение — пустой объект.
    // выберем из объекта только количество повторений, сохраним в массив
    const valuesArr = Object.values(keywordsObj);
    // посчитаем количество тегов
    const allTagAmount = valuesArr.length;
    // отсортируем массив с количеством повторений по убыванию
    const sortedValuesArr = valuesArr.sort();
    sortedValuesArr.sort(function (a, b) {
      return b - a;
    });
    // получим значения максимального количества повторений
    const firstValue = sortedValuesArr[0];
    const secondtValue = sortedValuesArr[1];
    // функция для поиска ключей в объекте по их значениям
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    const firstTag = getKeyByValue(keywordsObj, firstValue);
    const secondTag = getKeyByValue(keywordsObj, secondtValue);
    const tagAmount = allTagAmount - 2;
    firstTagSpan.textContent = firstTag;
    secondTagSpan.textContent = secondTag;
    tagAmountSpan.textContent = tagAmount;
    const articleAmount = res.data.length;
    // надо вынести в отдельный метод и повторять при удалении статей
    if (articleAmount >= 5) { // надо доработать
      articlesCaption.textContent = 'сохранённых статей';
    } else if (articleAmount < 5 & articleAmount != 1) {
      articlesCaption.textContent = 'сохранённые статьи';
    } else if (articleAmount === 1) {
      articlesCaption.textContent = 'сохранённая статья';
    }
    cardList.renderSavedArticles(savedArticlesArr);
  })
  .catch(err => alert(err));

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
