import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // ★ 세션 쿠키 활성화 필수
});

export default api;
