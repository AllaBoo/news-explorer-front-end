import { resultSection, resultNotFound, resultLoading, resultTitle, resultError, resultContainer, resultMoreButton } from '../constants/constants'
export class Result {
  constructor(api, cardList) {
    this.api = api;
    this.cardList = cardList;
  };

  searchNews(keyword) {
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

    this.api.getNews(keyword)
      .then((res) => {
        if (res.articles.length === 0) {
          return resultNotFound.classList.remove('hidden');
        } else {
          this.cardList.render(res.articles);
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
  }
}