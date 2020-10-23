export class CardList {
  constructor(resultContainer, cardTemplate, createCard, api) {
    this.resultContainer = resultContainer;
    this.cardTemplate = cardTemplate;
    this.createCard = createCard;
    this.articlesArr = [];
  };

  addCard = (data) => {
    this.resultContainer.append(this.createCard(data, this.cardTemplate).create());
  }

  render(articles) {
    this.articlesArr = articles;
    const initArr = articles.slice(0, 3);
    initArr.forEach(data => {
      this.addCard(data)
    });

  }

  renderMore() {
    const newArr = this.articlesArr.splice(4, 3);
    newArr.forEach(data => {
      this.addCard(data)
    });
  }
}