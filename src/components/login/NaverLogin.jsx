import { useEffect, useRef } from "react";
import NaverUnion from "../../img/NaverUnion.png";

const NaverLogin = () => {
  const naverRef = useRef();
  const { naver } = window;

  const NAVER_CLIENT_ID = "T9R5hFNUTuTa1UqoVBcO";
  // process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL =
    "https://gnims-chaejung-work-git-dev-angelachaejung.vercel.app/social/naver-login";
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
  };
  //원형아이콘클릭해도 네이버로그인이 가능.
  const handleClick = () => {
    naverRef.current.children[0].click();
  };
  // 화면 첫 렌더링이후 바로 실행
  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      {/*네이버 로그인아이콘표시 */}
      <div ref={naverRef} id="naverIdLogin" />
      <img
        onClick={handleClick}
        className="h-[60px]"
        src={NaverUnion}
        alt="네이버로고이미지"
      />
    </>
  );
};
export default NaverLogin;
