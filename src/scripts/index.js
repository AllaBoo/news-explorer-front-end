import '../styles/index.css';
import { loginPopup, registerPopup, messagePopup, loginButton, registerButton, loginButtonHeader, searchForm, searchWord } from './constants/constants'
import { Popup } from './components/Popup';
import { NewsApi } from './api/NewsApi';

const popupRegister = new Popup(registerPopup);
const popupLogin = new Popup(loginPopup);
const popupMessage = new Popup(messagePopup);
const newsApi = new NewsApi();

loginButtonHeader.addEventListener('click', () => popupLogin.open());
registerButton.addEventListener('click', () => {
  popupLogin.close();
  popupRegister.open();
});
loginButton.addEventListener('click', () => {
  popupRegister.close();
  popupLogin.open();
});

searchForm.addEventListener('submit', () => {
  newsApi.getNews(searchWord.value)
    .then(res => {
      console.log(res);
    })
});