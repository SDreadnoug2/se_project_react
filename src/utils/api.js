import { getToken } from "./token";
export const baseUrl = process.env.NODE_ENV === "production" 
? "https://api.wtwrmil.crabdance.com" 
: "http://localhost:3001";
const jwt = getToken();

export function checkResponse(res) {
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
export function createItem(token, name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    console.log(res);
    return checkResponse(res);
  });
}

export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
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


export const editProfile = (token, name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar})
  })
  .then((res) => res.json()) 
  .then((data) => data); 
};

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  .then(checkResponse)
};
export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then(checkResponse)
}

