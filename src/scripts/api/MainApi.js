export class MainApi {
  constructor() {
  }

  signUp = (newUserInfo) => {
    return fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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
    console.log('данные из api');
    console.log(loginData);
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

}