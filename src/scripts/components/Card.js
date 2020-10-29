import { searchWord, imageUrl } from '../constants/constants'
export class Card {
  constructor(data, cardTemplate, api) {
    this.data = data;
    this.card = null;
    this.cardTemplate = cardTemplate;
    this.api = api;
    this.hoverIcon = this.hoverIcon.bind(this);
    this.unHoverIcon = this.unHoverIcon.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  };

  create() {
    this.card = this.cardTemplate.cloneNode(true);
    const image = this.data.url === null ? imageUrl : this.data.url;
    this.card.querySelector('.article__link').setAttribute('href', image);
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__photo').setAttribute('src', this.data.urlToImage);
    this.card.querySelector('.article__date').textContent = this.data.publishedAt;
    this.card.querySelector('.article__text').textContent = this.data.description;
    this.card.querySelector('.article__source').textContent = this.data.source.name;
    this.card.querySelector('.article__icon').addEventListener('click', this.saveArticle);
    this.setListeners();
    return this.card;
  }

  createArticle() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__container').dataset.id = this.data._id;
    this.card.querySelector('.article__link').setAttribute('href', this.data.link);
    this.card.querySelector('.article__tag').textContent = this.data.keyword;
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__photo').setAttribute('src', this.data.image);
    this.card.querySelector('.article__date').textContent = this.data.date;
    this.card.querySelector('.article__text').textContent = this.data.text;
    this.card.querySelector('.article__source').textContent = this.data.source;
    this.card.querySelector('.article__icon').addEventListener('click', this.deleteArticle);
    this.setListeners();
    return this.card;
  }

  hoverIcon() {
    // нужен разный ховер для статей и карточек, статьи показывают подсказку независимо от логина
    const articleIcon = this.card.querySelector('.article__icon');
    while (articleIcon.firstChild) {
      articleIcon.removeChild(articleIcon.firstChild);
    };
    const iconHover = document.querySelector('#icon-hover').content.querySelector('img').cloneNode(true);
    if (localStorage.getItem('token') === null) {
      this.card.querySelector('.article__tooltip').classList.remove('hidden');
    }
    articleIcon.append(iconHover);
  }

  unHoverIcon() {
    const articleIcon = this.card.querySelector('.article__icon');
    while (articleIcon.firstChild) {
      articleIcon.removeChild(articleIcon.firstChild);
    };
    const iconUnhover = document.querySelector('#icon-unhover').content.querySelector('img').cloneNode(true);
    this.card.querySelector('.article__tooltip').classList.add('hidden');
    articleIcon.append(iconUnhover);
  }

  saveArticle() {
    // слушатель срабатывает только на подложке, но не на самой иконке
    this.api.getUser()
      .then((res) => {
        if (res != undefined) {
          const articleIcon = this.card.querySelector('.article__icon');
          this.card.querySelector('.article__tooltip').classList.add('hidden');
          while (articleIcon.firstChild) {
            articleIcon.removeChild(articleIcon.firstChild);
          };
          const iconMark = document.querySelector('#icon-mark').content.querySelector('img').cloneNode(true);
          articleIcon.append(iconMark);
          this.removeListeners();
          const articleData = {
            keyword: searchWord.value,
            title: this.data.title,
            text: this.data.description,
            date: this.data.publishedAt,
            source: this.data.source.name,
            link: this.data.url,
            image: this.data.urlToImage
          };
          this.api.postArticle(articleData);
        }
      })
  }

  deleteArticle() {
    this.removeListeners();
    const articleID = this.card.querySelector('.article__container').dataset.id;
    this.card.closest('.article').remove();
    this.api.removeArticle(articleID);
  }

  setListeners() {
    const articleIcon = this.card.querySelector('.article__icon');
    articleIcon.addEventListener('mouseover', this.hoverIcon);
    articleIcon.addEventListener('mouseout', this.unHoverIcon);
  }

  removeListeners() {
    const articleIcon = this.card.querySelector('.article__icon');
    articleIcon.removeEventListener('mouseover', this.hoverIcon);
    articleIcon.removeEventListener('mouseout', this.unHoverIcon);
    articleIcon.removeEventListener('click', this.saveArticle);
    articleIcon.addEventListener('click', this.deleteArticle);
  }

}
