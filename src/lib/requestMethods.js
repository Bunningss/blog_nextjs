import axios from "axios";

const baseUrl = "https://theblog.herokuapp.com/api/";
// const baseUrl = "http://localhost:3000/api/";

export const publicRequest = axios.create({
  baseURL: baseUrl,
});
