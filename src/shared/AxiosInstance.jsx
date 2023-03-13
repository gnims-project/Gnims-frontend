import axios from "axios";

export const instance = axios.create({
  //본서버
  baseURL: process.env.REACT_APP_BASE_URL,
});

//서버에 요청을 보내기 전
instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
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

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errMsg = error.response.status;

    if (errMsg === 401) {
      window.location.href = "/login";
      return;
    }

    if (errMsg === 500) {
      window.location.href = "/500error";
      return;
    }
    return Promise.reject(error);
  }
);
