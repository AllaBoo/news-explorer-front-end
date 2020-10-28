import { searchWord } from '../constants/constants'
export class Card {
  constructor(data, cardTemplate, api) {
    this.data = data;
    this.card = null;
    this.cardTemplate = cardTemplate;
    this.api = api;
    this.hoverIcon = this.hoverIcon.bind(this);
    this.unHoverIcon = this.unHoverIcon.bind(this);
    this.markIcon = this.markIcon.bind(this);
  };

  create() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__link').setAttribute('href', this.data.url)
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__photo').setAttribute('src', this.data.urlToImage);
    this.card.querySelector('.article__date').textContent = this.data.publishedAt;
    this.card.querySelector('.article__text').textContent = this.data.description;
    this.card.querySelector('.article__source').textContent = this.data.source.name;
    this.setListeners();
    return this.card;
  }

  createArticle() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__link').setAttribute('href', this.data.link);
    this.card.querySelector('.article__tag').textContent = this.data.keyword;
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__photo').setAttribute('src', this.data.image);
    this.card.querySelector('.article__date').textContent = this.data.date;
    this.card.querySelector('.article__text').textContent = this.data.text;
    this.card.querySelector('.article__source').textContent = this.data.source;
    this.setListeners();
    return this.card;
  }

  hoverIcon() {
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

  markIcon() {
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
          this.api.saveArticle(articleData);
        }
      })
  }

  setListeners() {
    const articleIcon = this.card.querySelector('.article__icon');
    articleIcon.addEventListener('mouseover', this.hoverIcon);
    articleIcon.addEventListener('mouseout', this.unHoverIcon);
    articleIcon.addEventListener('click', this.markIcon);
  }

  removeListeners() {
    const articleIcon = this.card.querySelector('.article__icon');
    articleIcon.removeEventListener('mouseover', this.hoverIcon);
    articleIcon.removeEventListener('mouseout', this.unHoverIcon);
    articleIcon.removeEventListener('click', this.markIcon);
  }

}
