import { checkResponse } from "./api";
export const BASE_URL = "http://localhost:3001"

export const register = (name, avatar, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password })
    }).then((res) => {
        checkResponse(res);
    })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    }).then((res) => {
        return checkResponse(res);
    })
};
