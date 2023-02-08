import axios from "axios";

const baseUrl = "http://localhost:3000/api/";
const token = "";

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

export const userRequest = axios.create({
  baseURL: baseUrl,
  headers: { token: `Bearer ${token}` },
});
