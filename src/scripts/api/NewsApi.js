export class NewsApi {
  constructor() {
  }

  getNews(keyword) {
    const today = new Date();
    const weekInMS = 604800000;
    const lastweek = new Date(today.getTime() - weekInMS);
    const startDate = lastweek.toISOString().slice(0, 10);
    const finalDate = today.toISOString().slice(0, 10);
    return fetch(`https://newsapi.org/v2/everything?q=${keyword}&from=${startDate}&to=${finalDate}&apiKey=89c2db63dfdc4d529c31e5e170b44a6d&pageSize=2`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
      })
  }

}
