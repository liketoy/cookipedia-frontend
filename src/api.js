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
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((reponse) => reponse.data);
