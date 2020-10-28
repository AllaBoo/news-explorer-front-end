export class MainApi {
  constructor() {
  }

  signUp = (newUserInfo) => {
    return fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: newUserInfo.email,
        password: newUserInfo.password,
        name: newUserInfo.name
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => { throw err; })
  }

  signIn = (loginData) => {
    return fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => { throw err; })
  }

  getUser() {
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

  saveArticle = (articleData) => {
    return fetch(`http://localhost:3000/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: articleData.keyword,
        title: articleData.title,
        text: articleData.text,
        date: articleData.date,
        source: articleData.source,
        link: articleData.link,
        image: articleData.image
      }),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

  getInitialArticles() {
    return fetch(`http://localhost:3000/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      const json = res.json();
      return json.then(Promise.reject.bind(Promise))
    })
      .catch((err) => { throw err; })
  }

}