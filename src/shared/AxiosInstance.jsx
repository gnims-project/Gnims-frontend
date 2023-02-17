import axios from "axios";

export const instance = axios.create({
  //로컬
  //baseURL: "http://localhost:3001",
  //본서버
  baseURL: "https://eb.jxxhxxx.shop",
  //민우님 개인서버
  //baseURL: "http://hayangaeul.shop/auth/login",
  // baseURL: "http://hayangaeul.shop",
});

//서버에 요청을 보내기 전
instance.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => {
    window.location("/login");
    return Promise.reject(error);
  }
);
