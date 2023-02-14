import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IsModal from "../modal/Modal";
import kakaologo from "../../img/kakao_login_medium_narrow.png";
import naverlogo from "../../img/naver-icon.png";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import LoginButton from "../button/LoginButton";
import "../style/login.css";
import { __emailLogin } from "../../redux/modules/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import NaverLoginPage from "../../page/NaverLoginPage";

const EmailLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState("");
  const { isLoading } = useSelector((state) => state.LoginSlice);

  console.log(isLoading);
  //서버에 전달하기 위한 input Ref 생성
  const userEmailRef = useRef();
  const userPasswordRef = useRef();

  //아이디 비밀번호가 틀렸을시 문구표시여부
  const [regulation, SetRegulation] = useState({
    regulationEmail: true,
    regulationPassword: true,
  });

  //이메일, 비밀번호 정규 표현식
  const emailRegulationExp =
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegulationExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;

  //유효성검사
  const onValidity = (event) => {
    const { id, value } = event.target;

    if (id === "userEmail") {
      if (!emailRegulationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      } else SetRegulation(() => ({ ...regulation, regulationEmail: true }));
    } else {
      if (!passwordRegulationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      } else SetRegulation(() => ({ ...regulation, regulationPassword: true }));
    }
  };

  //모달창
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  //서버에 전달
  const onSubmit = (event) => {
    event.preventDefault();

    const userEmailCurrent = userEmailRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const emailValue = userEmailCurrent.value;
    const passwordValue = userPasswordCurrent.value;

    //이메일 빈칸 및 유효성검사
    if (emailValue.trim() === "") {
      SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      userEmailCurrent.focus();
      return;
    } else if (!emailRegulationExp.test(emailValue)) {
      SetRegulation(() => ({ ...regulation, regulationEmail: false }));
      return;
    }

    //비밀번호빈칸 및 유효성검사
    if (passwordValue.trim() === "") {
      SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      userPasswordCurrent.focus();
      return;
    } else if (!passwordRegulationExp.test(passwordValue)) {
      SetRegulation(() => ({ ...regulation, regulationPassword: false }));
      userPasswordCurrent.focus();
      return;
    }

    dispatch(
      __emailLogin({
        email: emailValue,
        password: passwordValue,
        navigate,
        onModalOpen,
        setModalStr,
      })
    );
  };

  //카카오 로그인
  const onClickKakaoLongin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // 네이버 로그인
  const onClickNaverLogin = () => {
    //window.location.href =
  };

  return (
    <>
      <div className="container h-[100vh] max-sm bg-red-100 text-center">
        <div className=" bg-red-200 grid grid-rows-2 gap-4">
          <div className="m-auto  row-start-1 ">
            <div className="m-auto w-[250px] h-[50px] overflow-hidden">
              <img
                src="https://pbs.twimg.com/media/FACQ9-hUcAcA_11.jpg "
                alt="곰캐릭터가 우쭐거리며 왠지 잘될 것 같은 기분포즈 중"
                className="h-full w-full"
              />
            </div>
          </div>
          <form className="bg-red-400 border-solid border-4 p-3 mt-[-50px]">
            <div className="grid grid-row-3 gap-3">
              <div className="bg-red-700 h-[100px]">
                <div className=" bg-red-500 grid grid-row-2 gap-2">
                  <div className="bg-red-700 mt-1 text-left">
                    <div>
                      <label
                        htmlFor="userEmail"
                        className=" bg-red-600 text-left  cursor-pointer"
                      >
                        이메일
                      </label>
                    </div>
                  </div>
                  <input
                    className="w-full py-2 rounded-lg px-3"
                    type="text"
                    id="userEmail"
                    ref={userEmailRef}
                    placeholder="아이디(이메일) 입력"
                    onChange={onValidity}
                  />
                </div>
                <div className="pt-2">
                  <p hidden={regulation.regulationEmail}>
                    아이디(이메일)을 입력해주세요.
                  </p>
                </div>
              </div>
              <div className="bg-red-700 h-[100px]">
                <div className=" bg-red-500 grid grid-row-2 gap-2">
                  <div className="bg-red-700 mt-1 text-left">
                    <label
                      htmlFor="userPassword"
                      className=" bg-red-600 text-left  cursor-pointer"
                    >
                      password
                    </label>
                  </div>
                  <input
                    className="w-full py-2 rounded-lg px-3"
                    type="password"
                    id="userPassword"
                    ref={userPasswordRef}
                    placeholder="비밀번호 입력"
                    onChange={onValidity}
                  />
                </div>
                <div className="pt-2">
                  <p hidden={regulation.regulationPassword}>
                    8글자이상 입력 해주세요.
                  </p>
                </div>
              </div>
              <button
                onClick={onSubmit}
                className="h-[50px] w-full bg-[#949393]"
              >
                로그인
              </button>
            </div>
          </form>
          <div>
            <button onClick={() => navigate(`/signup`)}>회원가입</button>
          </div>
          <div className="hr-sect">
            <div>간편 로그인</div>
          </div>
          <div className="m-auto grid grid-flow-col gap-12">
            <LoginButton onEvent={onClickKakaoLongin} img={kakaologo} />
            <LoginButton onEvent={onClickKakaoLongin} img={naverlogo} />
            {/* <NaverLoginPage /> */}
          </div>
          <IsModal isModalOpen={isOpen.isOpen} onMoalClose={onMoalClose}>
            {ModalStr}
          </IsModal>
        </div>
      </div>
    </>
  );
};

export default EmailLogin;
