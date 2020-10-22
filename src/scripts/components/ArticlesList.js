export class ArticlesList {
  constructor(placeList, popup, cardTemplate, createCard, api) {
    this.placeList = placeList;
    this.popup = popup;
    this.cardTemplate = cardTemplate;
    this.createCard = createCard;
    this.api = api;
  };

  renderResults() {
    this.api.getInitialCards(queryObj).then(res => {
      res.forEach(data => {
        this.addCard(data, this.popup)
      });
    })
      .catch(err => alert(err));
  }
}