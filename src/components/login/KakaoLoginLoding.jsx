import React, { useEffect } from "react";
import { KakaoLoginApi } from "../../api/LoginApi";
import { useRecoilState } from "recoil";
import { isLoginState } from "../../recoil/UserAtom";

//인가코드를 백으로 전달하기 위한 페이지
const KakaoLoginLoding = () => {
  const setIsLogin = useRecoilState(isLoginState);
  // new URL 객체에서 searchParams객체의 get메소드를 사용하여 'code'키의 값을 추출
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("카카오 인가코드", code);

  //페이지가 로딩 되면 서버에 코드를 전달해준다.
  useEffect(() => {
    KakaoLoginApi.KakaoLogin({ code }).then((res) => {
      console.log("서버로 보내는값?", res.data);
      const accessToken = res.headers.get("Authorization");
      const nickname = res.data.nickname;
      const email = res.data.email;

      //유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
      if (accessToken && nickname && email) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("email", email);
        setIsLogin(true);
        alert(`소셜로그인 인증 완료! ${nickname}님 환영합니다!`);
        return window.location.assign("/");
      } else {
        alert("인증 오류! 다시 시도해주세요!");
        return window.location.assign("/");
      }
    });
  });
  return <div>KakaoLoginLoding</div>;
};

export default KakaoLoginLoding;
