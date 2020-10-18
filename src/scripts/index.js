import '../components/index.css';

const loginButtonHeader = document.querySelector('.header__button');
const loginPopup = document.querySelector('#loginPopup');
const closeButton = document.querySelector('.popup__close');
const registerButton = document.querySelector('#registerButton');
const registerPopup = document.querySelector('#registerPopup');
const headerIcon = document.querySelector('.header__icon');
const templateClose = document.querySelector('#icon-close').content.querySelector('img');
const firstIcon = document.querySelector('#first-icon');

function popupOpener(popupName) {
  popupName.classList.add('popup_opened');
  closeButton.addEventListener('click', () => popupCloser(event.target));
};

function popupCloser(cross) {
  cross.closest('.popup').classList.remove('popup_opened');
};

function menuOpener() {
  headerIcon.removeChild(firstIcon);
  const cross = templateClose.cloneNode(true);
  headerIcon.append(cross);
  document.querySelector('.header').classList.add('header_opened');
  document.querySelector('.header__nav').classList.add('header__nav_opened');
  document.querySelector('.header__menu').classList.add('header__menu_opened');
  document.querySelector('.body').classList.add('body_overlay');
};

loginButtonHeader.addEventListener('click', () => popupOpener(loginPopup));
registerButton.addEventListener('click', () => {
  popupCloser(loginPopup);
  popupOpener(registerPopup);
});

headerIcon.addEventListener('click', menuOpener);