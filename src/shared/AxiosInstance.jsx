import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingPage from "../page/LoadingPage";

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
      window.location.href = "/*";
      return;
    }
    return Promise.reject(error);
  }
);
