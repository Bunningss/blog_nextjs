import axios from "axios";

const baseUrl = "https://theblog.herokuapp.com/api/";
const token = "";

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

export const userRequest = axios.create({
  baseURL: baseUrl,
  headers: { token: `Bearer ${token}` },
});
