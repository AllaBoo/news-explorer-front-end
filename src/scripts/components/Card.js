export class Card {
  constructor(data, cardTemplate) {
    this.data = data;
    this.card = null;
    this.cardTemplate = cardTemplate;
  };

  create() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__link').setAttribute('href', this.data.url)
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__photo').setAttribute('src', this.data.urlToImage);
    this.card.querySelector('.article__date').textContent = this.data.publishedAt;
    this.card.querySelector('.article__text').textContent = this.data.description;
    this.card.querySelector('.article__source').textContent = this.data.source.name;
    return this.card;
  }

}
