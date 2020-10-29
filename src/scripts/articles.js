import '../styles/articles.css';

import {
  resultContainer, cardTemplate, headerIcon, firstTagSpan, secondTagSpan, tagAmountSpan,
  articlesAmountSpan, userSpan, articlesAmountCaptionSpan, tagCaptionSpan
} from './constants/constants';
import { Header } from './components/Header';
import { MainApi } from './api/MainApi';
import { Card } from './components/Card';
import { CardList } from './components/CardList';

const mainApi = new MainApi();
const header = new Header(mainApi);
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new CardList(resultContainer, cardTemplate, createCard, mainApi);

mainApi.getUser()
  .then((res) => {
    userSpan.textContent = res.name;
  })
  .catch(err => alert(err));

mainApi.getInitialArticles()
  .then((res) => {
    const savedArticlesArr = res.data;
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
    // удалим из объекта первый тег для избежания повторения при равных значениях, нотация для ключа-переменной скобочная
    delete keywordsObj[firstTag];
    const secondTag = getKeyByValue(keywordsObj, secondtValue);
    const anoverTagAmount = allTagAmount - 2;
    const articleAmount = res.data.length;
    if (articleAmount <= 0) {
      articlesAmountSpan.textContent = 0;
      document.querySelector('.greeting__text').classList.add('hidden');
    } else if (anoverTagAmount <= 0) {
      tagAmountSpan.textContent = 0;
    } else { tagAmountSpan.textContent = anoverTagAmount; }
    firstTagSpan.textContent = firstTag;
    secondTagSpan.textContent = secondTag;
    articlesAmountSpan.textContent = articleAmount;
    const arr1 = [1, 21, 31, 41, 51, 61, 71, 81, 91];
    const arr2 = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, 83, 84, 92, 93, 94];
    if (arr1.some(function (item) {
      return (item === articleAmount);
    })) {
      articlesAmountCaptionSpan.textContent = 'сохранённая статья';
    } else if (arr2.some(function (item) {
      return (item === articleAmount);
    })) {
      articlesAmountCaptionSpan.textContent = 'сохранённые статьи';
    } else {
      articlesAmountCaptionSpan.textContent = 'сохранённых статей';
    }
    if (arr1.some(function (item) {
      return (item === anoverTagAmount);
    })) {
      tagCaptionSpan.textContent = 'другому';
    } else {
      tagCaptionSpan.textContent = 'другим';
    }
    cardList.renderSavedArticles(savedArticlesArr);
  })
  .catch(err => alert(err));

headerIcon.addEventListener('click', () => header.openMenu());
header.render();
