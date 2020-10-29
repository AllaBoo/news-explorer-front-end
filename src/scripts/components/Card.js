import { searchWord, imageUrl } from '../constants/constants'
import { editDataFormat } from '../utils/utils'
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
    this.card.querySelector('.article__date').textContent = editDataFormat(this.data.publishedAt.slice(0, 10));
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
    const tooltip = this.card.querySelector('.article__tooltip')
    this.card.querySelector('#icon-hover').classList.remove('hidden');
    this.card.querySelector('#icon-unhover').classList.add('hidden');
    if (document.URL.includes('articles')) {
      tooltip.classList.remove('hidden');
    } else if (localStorage.getItem('token') === null) {
      tooltip.classList.remove('hidden');
    }
  }

  unHoverIcon() {
    this.card.querySelector('#icon-hover').classList.add('hidden');
    this.card.querySelector('#icon-unhover').classList.remove('hidden');
    this.card.querySelector('.article__tooltip').classList.add('hidden');
  }

  saveArticle() {
    this.api.getUser()
      .then((res) => {
        if (res != undefined) {
          this.card.querySelector('.article__tooltip').classList.add('hidden');
          this.card.querySelector('#icon-hover').classList.add('hidden');
          this.card.querySelector('#icon-mark').classList.remove('hidden');
          this.removeListeners();
          const articleData = {
            keyword: searchWord.value,
            title: this.data.title,
            text: this.data.description,
            date: editDataFormat(this.data.publishedAt.slice(0, 10)),
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
    window.location.reload();
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
