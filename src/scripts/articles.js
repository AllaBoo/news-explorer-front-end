import '../components/articles.css';

const headerIcon = document.querySelector('.header__icon');
const templateClose = document.querySelector('#icon-close').content.querySelector('img');
const firstIcon = document.querySelector('#first-icon');

function menuOpener() {
  headerIcon.removeChild(firstIcon);
  const cross = templateClose.cloneNode(true);
  headerIcon.append(cross);
  const header = document.querySelector('.header');
  header.classList.add('header_opened');
  document.querySelector('.header__nav').classList.add('header__nav_opened');
  document.querySelector('.header__menu').classList.add('header__menu_opened');
  document.querySelector('#active-link').classList.remove('header__link_active');
  document.querySelector('.body').classList.add('body_overlay');
};


headerIcon.addEventListener('click', menuOpener);