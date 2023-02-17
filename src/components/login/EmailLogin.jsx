import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IsModal from "../modal/Modal";
import kakaologo from "../../img/kakao_login_medium_narrow.png";
import { KAKAO_AUTH_URL } from "../../shared/OAuth";
import LoginButton from "../button/LoginButton";
import "../style/login.css";
import { __emailLogin } from "../../redux/modules/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import NaverLogin from "../../page/NaverLoginPage";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/LoginSignupInputBox";

const EmailLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });
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

  return (
    <div className="container md">
      <div className="ml-[20px] mr-[20px]">
        <div className="grid grid-rows ">
          <div className=" h-[150px] mt-[94px]">
            <div className="mx-auto w-[87px] h-[64px] overflow-hidden gap-[10px] ">
              <img
                src="https://pbs.twimg.com/media/FACQ9-hUcAcA_11.jpg "
                alt="곰캐릭터가 우쭐거리며 왠지 잘될 것 같은 기분포즈 중"
                className="h-full w-full "
              />
            </div>
          </div>
          <form className="mt-[-40px]">
            <div className=" grid grid-row-3 gap-[10px]">
              <div className="">
                <div className=" grid grid-row-2">
                  <Label htmlFor="userEmail">이메일</Label>
                  <LoginSignupInputBox
                    id="userEmail"
                    ref={userEmailRef}
                    onChange={onValidity}
                    placeholder="아이디(이메일) 입력"
                  />
                </div>
                <div className="flex items-center ">
                  <p
                    className="h-[40px]  w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center"
                    hidden={regulation.regulationEmail}
                  >
                    아이디(이메일)을 입력해주세요.
                  </p>
                </div>
              </div>
              <div className="">
                <div className="grid grid-row-2">
                  <Label htmlFor="userPassword">비밀번호</Label>
                  <LoginSignupInputBox
                    ref={userPasswordRef}
                    onChange={onValidity}
                    id="userPassword"
                    placeholder="비밀번호 입력"
                  />
                </div>
                <div className="flex items-center ">
                  <p
                    className="h-[40px] w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center"
                    hidden={regulation.regulationPassword}
                  >
                    8글자이상 입력 해주세요.
                  </p>
                </div>
              </div>
              <button
                onClick={onSubmit}
                className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px]"
              >
                로그인
              </button>
            </div>
          </form>
          <div className="mt-[26px] grid grid-cols-2 text-center">
            <div>
              <button className="text-[#12396F] text-[16px] font-[400] px-[30px] py-[10px]">
                비밀번호 재설정
              </button>
            </div>
            <div>
              <button
                className="text-[#12396F] text-[16px] font-[400] px-[30px] py-[10px] "
                onClick={() => navigate(`/signup`)}
              >
                회원가입
              </button>
            </div>
          </div>
          <div className="hr-sect">
            <div>간편 로그인</div>
          </div>
          <div className="flex gap-[110px] mx-auto h-[100px] mt-[46px]">
            <div className="text-center ">
              <NaverLogin />
              <p className="mt-[20px] text-[#12396F] font-[400] text-[14px]">
                네이버
              </p>
            </div>
            <div className="text-center">
              <LoginButton onEvent={onClickKakaoLongin} img={kakaologo} />
              <p className="mt-[20px] text-[#12396F] font-[400] text-[14px]">
                카카오
              </p>
            </div>
          </div>
          <IsModal
            isModalOpen={isOpen.isOpen}
            onMoalClose={onMoalClose}
            message={{ ModalStr }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
