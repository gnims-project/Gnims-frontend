import React from "react";
import kakaologo from "../../img/kakao_login_medium_narrow.png";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";

const KakaoLogin = () => {
  //버튼을 눌렀을때 인가 코드를 받아기 위한 주소로 넘어감
  const onClickKakaoLongin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div onClick={onClickKakaoLongin}>
      <img src={kakaologo} alt="카카오로그인"></img>
    </div>
  );
};

export default KakaoLogin;
