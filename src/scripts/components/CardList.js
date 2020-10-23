export class CardList {
  constructor(resultContainer, cardTemplate, createCard, api) {
    this.resultContainer = resultContainer;
    this.cardTemplate = cardTemplate;
    this.createCard = createCard;
  };

  addCard = (data) => {
    this.resultContainer.append(this.createCard(data, this.cardTemplate).create());
  }

  render(articles) {
    articles.forEach(data => {
      this.addCard(data, this.popup)
    });
  }
}