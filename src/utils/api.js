const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((response) => response.json());
}

// Function to add a new item
export function createItem({ _id, name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => res.json());
}

// Function to delete an item by ID
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

/*
loadUserInfo() {
  return fetch(`${this._baseUrl}users/me`, { headers: this._headers })
    .then(this._checkResponse)
    .then((data) => {
      return {
        userName: data.name,
        userJob: data.about,
        avatar: data.avatar,
      };
    });
}

updateProfile(newInfo) {
  return fetch(`${this._baseUrl}users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name: newInfo.userName,
      about: newInfo.userJob,
      avatar: newInfo.avatar,
    }),
  }).then(this._checkResponse);
}
*/
