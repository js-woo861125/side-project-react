import axios from "axios";

const API = import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션 쿠키 전송용
});

export default api;
