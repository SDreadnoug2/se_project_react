const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  });
}
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  });
}
