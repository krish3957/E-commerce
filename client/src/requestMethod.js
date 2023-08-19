import axios from "axios";

const BASE_URL = "https://e-commerce-api-psi.vercel.app/api";

const storage = JSON.parse(localStorage.getItem("persist:root"));
const user = storage && storage.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser && currentUser.accesTocken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers:{token :`Bearer ${TOKEN}`}
}
);

