import axios from "axios";
import React, { useEffect, useState } from "react";

function Callback() {
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = async () => {
    const navertoken = window.location.href.split("=")[1].split("&")[0];
    console.log(navertoken);
    // URL에서 추출한 access token을 로컬 스토리지에 저장

    // localStorage.setItem("NaverAuthorization", navertoken);
  };

  const sendTokenAndGetAuthorization = async () => {
    await axios
      .get("https://eb.jxxhxxx.shop/naver/login", {
        //   .get("http://hayangaeul.shop/naver/login", {
        headers: {
          token: window.location.href.split("=")[1].split("&")[0],
        },
      })
      .then((res) => {
        //이미 멤버라면 Authorization이 담겨 올 것이고, member라고
        localStorage.setItem("Authorization", res.headers.get("Authorization"));
        console.log("res", res);
        console.log("email?", res.data.data.email);
        console.log("member?", res.data.message);
        const email = res.data.data.email;
        localStorage.setItem("email", email);
      });
    // console.log(data);
  };

  useEffect(() => {
    userAccessToken();
    getToken();
    sendTokenAndGetAuthorization();
  }, []);

  return (
    <div>
      <h1>loding...</h1>
    </div>
  );
}

export default Callback;
