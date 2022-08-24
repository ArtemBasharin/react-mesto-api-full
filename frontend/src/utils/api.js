export function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
}

class MyApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(name, employment) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
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
      method: "PATCH",
      headers: this._headers,
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
      method: "POST",
      headers: this._headers,
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
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

const api = new MyApi({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    "content-type": "application/json",
    authorization: "37e0e7dd-b074-4ce5-8552-85f100e53932",
  },
});

export default api;
