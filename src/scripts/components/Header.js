export class Header {
  constructor(api) {
    this.api = api;
    this.articleLink = document.querySelector('#article-link');
    this.quitButton = document.querySelector('#quit-button');
    this.loginButtonHeader = document.querySelector('#login-button-header');
  }

  render() {
    this.api.getUser(localStorage.getItem('token'))
      .then((res) => {
        this.loginButtonHeader.classList.add('hidden');
        this.articleLink.classList.remove('hidden');
        document.querySelector('#greeting').textContent = res.name;
        this.quitButton.classList.remove('hidden');
      })
  }


}

