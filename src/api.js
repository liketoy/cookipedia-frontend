import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true,
});


export const getMe = () =>
  instance.get("users/me").then((response) => response.data);

export const postLogin = ({ username, password }) =>
  instance
    .post(
      "users/login",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || ""
        },
      }
    )
    .then((reponse) => reponse.data);

export const postSignUp = ({ name, username, password, gender, avatar, birth_date, address, phone_number, email, nickname }) => {
  instance.post(
    "users/",
    { name, username, nickname, password, gender, avatar, birth_date, address, phone_number, email },
    {
      headers: {
        "content-type": "multipart/form-data"
      },
    }
  ).then((response) => response.data).catch(error => {throw new Error(error)});
};
