
export const newsApiServer = NODE_ENV === 'development' ? 'https://newsapi.org/' : 'https://nomoreparties.co/news/';
export const mainApiServer = NODE_ENV === 'development' ? 'http://localhost:3000/' : 'http://localhost:3000/';

// при запущенном сервере адреса:
//export const mainApiServer = NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.news-explorer-praktikum.ru/';
