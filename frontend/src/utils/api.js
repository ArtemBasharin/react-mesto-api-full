import { base_url } from "./auth";

export function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
}

class MyApi {
  constructor(url, config) {
    this._url = url;
    this._config = config;
  }

  setAuthHeader(jwt){
    console.log(jwt);
    this._config = {
      ...this._config, 
      headers: {
        ...this._config.headers, 
        Authorization: `Bearer ${jwt}`
      },
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
     ...this._config, 
     method: "GET",
    }).then(checkResponse);
  }

  getUserInfo() {
    console.log(this._config)
    return fetch(`${this._url}/users/me`, {
      ...this._config,
      method: "GET",
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(name, employment) {
    return fetch(`${this._url}/users/me`, {
      ...this._config,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: employment,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      ...this._config,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  postNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      ...this._config,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      ...this._config,
      method: isLiked ? "DELETE" : "PUT",
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      ...this._config,
      method: "DELETE",
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new MyApi(
  base_url,
  {
    credentials: "include",
    headers: {
      'Sec-Fetch-Site': 'cross-site',
      "content-type": "application/json",
    },
  }
);

export default api;
