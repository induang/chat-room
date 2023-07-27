import axios from "axios";
import noti from "./noti";

/* 
	闭包: 内部维护一个请求栈, 记录过往的操作请求, 
*/

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_CHAT_BACK_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

httpRequest.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token") ?? "";
    if (config.headers) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    noti({ type: "error", message: error.message });
    Promise.reject(error);
  },
);

httpRequest.interceptors.response.use(
  (response) => {
    const token = response?.headers?.authorization;
    token && window.localStorage.setItem("token", token);
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status === 401) {
      noti({ type: "error", message: "Unauthorization." });
      window.localStorage.removeItem("token");
      window.location.href = "/";
    }
    noti({ type: "error", message });
    return Promise.reject();
  },
);

export default httpRequest;
