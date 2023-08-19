import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const storage = JSON.parse(localStorage.getItem("persist:root"));
const user = storage && storage.user;
const currentUser = user && JSON.parse(user).currentUser; 
var TOKEN;
if(currentUser){
  TOKEN=currentUser.accesTocken;
}else{
}
console.log(TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers:{token:`Bearer ${TOKEN}`}
});
