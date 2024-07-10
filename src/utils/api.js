const baseUrl = "http://localhost:3001";

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
