import axios from "axios";
import { useEffect } from "react";

const NaverLogin = () => {
  const { naver } = window;
  //    깃헙에 올릴 땐 아래의 env활용
  const NAVER_CLIENT_ID = "T9R5hFNUTuTa1UqoVBcO";
  // process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = "http://localhost:3000/callback";
  // process.env.REACT_APP_NAVER_CALLBACK_URL;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    /*
    아래와 같이 로그인한 유저 정보를 직접 접근하여 추출가능하다.
    백엔드에서도 Authorization과 함께 유저정보를 body에 담아줄 것이기 때문에 생략이 가능하다!
    그러나 편의를 위해 먼저 로컬스토리지에 담아두자!
    */

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userEmail = naverLogin.user.getEmail();
        const userNickName = naverLogin.user.getName();
        console.log(userEmail, userNickName);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("nickname", userNickName);
      }
    });
  };

  // URL에서 네이버토큰을 추출한다.
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const navertoken = window.location.href.split("=")[1].split("&")[0];
    console.log(navertoken);
    // URL에서 추출한 access token을 로컬 스토리지에 저장
    localStorage.setItem("NaverAuthorization", navertoken);
  };

  const sendTokenAndGetAuthorization = async () => {
    const { data } = await axios
      .get(`http://hayangaeul.shop/naver/login`, {
        headers: { token: localStorage.getItem("NaverAuthorization") },
      })
      .then((res) => {
        localStorage.setItem("Authorization", res.headers.get("Authorization"));
      });
    console.log(data);
  };

  // 화면 첫 렌더링이후 바로 실행
  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
    sendTokenAndGetAuthorization();
  }, []);

  return (
    <>
      {/*네이버 로그인아이콘표시 */}
      <div id="naverIdLogin" />
    </>
  );
};
export default NaverLogin;
