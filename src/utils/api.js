import { getToken } from "./token";
const baseUrl = "http://localhost:3001";
const jwt = getToken();

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((res) => {
    return checkResponse(res).then((res) => {
      return res.data;
    });
  });
}
export function createItem({ _id, name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({
      _id,
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return checkResponse(res);
  });
}

export const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkResponse(res);
  });
}


export const editProfile = ({name, avatar}) => {
  return fetch(`${baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ name, avatar})
  }).then((res) => {
    return res.data;
  })
}

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then((res) => {
    return res.data
  })
}

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then((res) => {
    return res.data
  })
}

