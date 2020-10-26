export class Header {
  constructor(api) {
    this.api = api;
    this.articleLink = document.querySelector('#article-link');
    this.quitButton = document.querySelector('#quit-button');
    this.loginButtonHeader = document.querySelector('#login-button-header');

    this.headerIcon = document.querySelector('.header__icon');
    this.templateClose = document.querySelector('#icon-close').content.querySelector('img');
    this.templateOpen = document.querySelector('#icon-open').content.querySelector('img');
  }

  render() {
    this.api.getUser()
      .then((res) => {
        if (res === undefined) {
          return;
        }
        this.loginButtonHeader.classList.add('hidden');
        this.articleLink.classList.remove('hidden');
        document.querySelector('#greeting').textContent = res.name;
        this.quitButton.classList.remove('hidden');
      })
  }

  openMenu() {
    while (this.headerIcon.firstChild) {
      this.headerIcon.removeChild(this.headerIcon.firstChild);
    };
    const cross = this.templateClose.cloneNode(true);
    this.headerIcon.append(cross);
    this.headerIcon.addEventListener('click', () => this.closeMenu());
    document.querySelector('.header__link').classList.remove('header__link_active'); // сломается на странице статей
    document.querySelector('.header').classList.add('header_opened'); // придумать именование и вынести в конструктор
    document.querySelector('.header__nav').classList.add('header__nav_opened');
    document.querySelector('.header__menu').classList.add('header__menu_opened');
    document.querySelector('.body').classList.add('body_overlay');
  }

  closeMenu() {
    while (this.headerIcon.firstChild) {
      this.headerIcon.removeChild(this.headerIcon.firstChild);
    };
    const open = this.templateOpen.cloneNode(true);
    this.headerIcon.append(open);
    this.headerIcon.addEventListener('click', () => this.openMenu());
    document.querySelector('.header').classList.remove('header_opened');
    document.querySelector('.header__nav').classList.remove('header__nav_opened');
    document.querySelector('.header__menu').classList.remove('header__menu_opened');
    document.querySelector('.body').classList.remove('body_overlay');
  }
}

