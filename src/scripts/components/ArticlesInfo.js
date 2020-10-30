import { firstTagSpan, secondTagSpan, tagAmountSpan, articlesAmountSpan, articlesAmountCaptionSpan, tagCaptionSpan, userSpan, tagCopulativeSpan } from '../constants/constants'
export class ArticlesInfo {
  constructor(api) {
    this.api = api;
    this.savedArticlesArr = [];
    this.arr1 = [1, 21, 31, 41, 51, 61, 71, 81, 91];
    this.arr2 = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, 83, 84, 92, 93, 94];
  };

  render(savedArticlesArr) {
    this.savedArticlesArr = savedArticlesArr;
    this._setUserName();
    this._setArticleAmount();
    this._setTags();
  }

  _setUserName() {
    this.api.getUser()
      .then((res) => {
        userSpan.textContent = res.name;
      })
      .catch(err => console.log(err));
  }

  _setArticleAmount() {
    const articleAmount = this.savedArticlesArr.length;
    if (articleAmount <= 0) {
      articlesAmountSpan.textContent = 0;
      document.querySelector('.greeting__text').classList.add('hidden');
    } articlesAmountSpan.textContent = articleAmount;
    if (this.arr1.some(function (item) {
      return (item === articleAmount);
    })) {
      articlesAmountCaptionSpan.textContent = 'сохранённая статья';
    } else if (this.arr2.some(function (item) {
      return (item === articleAmount);
    })) {
      articlesAmountCaptionSpan.textContent = 'сохранённые статьи';
    } else {
      articlesAmountCaptionSpan.textContent = 'сохранённых статей';
    }
  }

  _setTags() {
    const keywordsArr = [];
    // создаём массив ключевых слов, выдранных из объекта со статьями
    this.savedArticlesArr.forEach(article => {
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
    const thirdValue = sortedValuesArr[2];
    // функция для поиска ключей в объекте по их значениям
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    const firstTag = getKeyByValue(keywordsObj, firstValue);
    // удалим из объекта первый тег для избежания повторения при равных значениях, нотация для ключа-переменной скобочная
    delete keywordsObj[firstTag];
    const secondTag = getKeyByValue(keywordsObj, secondtValue);
    // удалим второй тег
    delete keywordsObj[secondTag];
    const thirdTag = getKeyByValue(keywordsObj, thirdValue);
    // получим количество других тегов
    const anoverTagAmount = allTagAmount - 2;
    // опишем логику вставки контента для разного количества тегов
    if (allTagAmount === 3) {
      tagAmountSpan.textContent = thirdTag;
      tagCaptionSpan.classList.add('hidden');
    } else if (allTagAmount === 2) {
      secondTagSpan.textContent = secondTag;
      tagAmountSpan.classList.add('hidden');
      tagCopulativeSpan.classList.add('hidden');
      tagCaptionSpan.classList.add('hidden');
    } else if (allTagAmount === 1) {
      secondTagSpan.textContent = '';
      tagAmountSpan.classList.add('hidden');
      tagCopulativeSpan.classList.add('hidden');
      tagCaptionSpan.classList.add('hidden');
    } else { tagAmountSpan.textContent = anoverTagAmount; }
    firstTagSpan.textContent = firstTag;
    secondTagSpan.textContent = secondTag;
    // поработаем с падежами при разном количестве других тегов
    if (this.arr1.some(function (item) {
      return (item === anoverTagAmount);
    })) {
      tagCaptionSpan.textContent = 'другому';
    } else {
      tagCaptionSpan.textContent = 'другим';
    }
  }
}
