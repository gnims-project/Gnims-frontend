import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../../api/Signup";
import IsModal from "../modal/Modal";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import {
  __nickNameCheck,
  setSingup,
  __openModal,
  __closeModal,
} from "../../redux/modules/SingupSlice";

const Signup = () => {
  //=============변수정리====================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [style, setStyle] = useState({
    bgColorName: "bg-inputBox",
    bgColorEmail: "bg-inputBox",
    bgColorNickname: "bg-inputBox",
    bgColorPassword: "bg-inputBox",
    bgColorPasswordCheck: "bg-inputBox",
  });

  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const { singup } = useSelector((state) => state.SingupSlice);

  const userNameRef = useRef();
  const userEmailRef = useRef();
  const userNickNameRef = useRef();
  const userPasswordRef = useRef();
  const PasswordCheckRef = useRef();

  //아이디 비밀번호가 틀렸을시 문구
  const [regulation, SetRegulation] = useState({
    regulationName: "",
    regulationEmail: "",
    regulationPassword: "",
    regulationPasswordCheck: "",
    regulationNickName: "",
  });

  const { nickNameDoubleCheck } = useSelector((state) => state.SingupSlice);

  //중복확인여부
  const [doubleCheck, setDoubleCheck] = useState({
    passwordDoubleCheck: false,
    emailDoubleCheck: false,
  });
  //모달창

  const onMoalClose = () => {
    dispatch(__closeModal());
  };

  //=============== 항목별 유효성검사===================

  //이름
  const nameValidationTest = (nameValidation) => {
    const nameRegulationExp = /^[a-zA-Z가-힣]{1,12}$/;
    if (!nameRegulationExp.test(nameValidation.value)) {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "한글 또는 영어로 작성해주세요.",
      }));

      nameValidation.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "",
      }));
    }
  };

  //이메일
  const emailValidationTest = (emailValidation) => {
    const emailRegulationExp =
      /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (emailRegulationExp.test(emailValidation.value)) {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "올바른 이메일 형식이 아닙니다.",
      }));

      emailValidation.focus();
      return;
    }
  };

  //닉네임
  const nickNameValidationTest = (nickNameValidation) => {
    const nickNameReglationExp = /^[a-zA-Z0-9가-힣]{2,8}$/;
    if (nickNameReglationExp.test(nickNameValidation.value)) {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "글자수 2~8자와 한글,영문,숫자만 포함해주세요.",
      }));

      nickNameValidation.focus();
      return;
    }
  };

  //비밀번호
  const passwordValidationTest = (passwordValidation) => {
    const passwordRegulationExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (passwordRegulationExp.test(passwordValidation.value)) {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "최소 8 자리에서 영문자와 숫자를 포함시켜주세요.",
      }));

      passwordValidation.focus();
      return;
    }
  };

  //비밀번호 확인
  const passwordCheckValidationTest = (passwordCheckValidation) => {
    const passwordvalue = userPasswordRef.current.value;
    if (passwordCheckValidation.value === passwordvalue) {
      setDoubleCheck(() => ({ ...doubleCheck, passwordDoubleCheck: true }));
      SetRegulation(() => ({
        ...regulation,
        regulationPasswordCheck: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationPasswordCheck: "비밀번호와 일치하는지 확인해주세요.",
      }));
      setDoubleCheck(() => ({ ...doubleCheck, passwordDoubleCheck: false }));
      passwordCheckValidation.focus();
      return;
    }
  };

  //====================중복확인===========================

  //이메일중복체크악시오스
  const emailDoubleCheckAxios = async (payload) => {
    await SignupApi.emailDoubleCheck(payload)
      .then((response) => {
        setDoubleCheck(() => ({ ...doubleCheck, emailDoubleCheck: true }));
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "",
        }));
        setModalStr({
          modalTitle: response.message,
          modalMessage: "",
        });
        dispatch(__openModal());
      })
      .catch((error) => {
        const { data } = error.response;

    
        if (data.status === 400) {
          if (Array.isArray(data.messages)) {
          
            setModalStr({
              modalTitle: "이메일을 확인해주세요.",
              modalMessage: data.messages[0],
            });
          } else {
            setModalStr({
              modalTitle: data.message,
              modalMessage: "이메일을 확인해주세요.",
            });
          }

          dispatch(__openModal());
        } else {
          // console.log(error);
        }
      });
  };

  //이메일 중복확인
  const onEmailDoubleCheck = (event) => {
    event.preventDefault();

    const emailCurrent = userEmailRef.current;

    if (emailCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));

      emailCurrent.focus();
      return;
    } else if (!doubleCheck.emailDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "",
      }));
      emailCurrent.focus();
    }

    emailDoubleCheckAxios({
      email: emailCurrent.value,
    });
  };

  //닉네임 중복확인
  const onNickNameCheck = (event) => {
    event.preventDefault();

    const nickNameCurrent = userNickNameRef.current;

    if (nickNameCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));

      nickNameCurrent.focus();
      return;
    } else if (!nickNameDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "",
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "",
      }));
    }
    dispatch(
      __nickNameCheck({
        nickname: nickNameCurrent.value,
        setModalStr,
        doubleCheck,
        setDoubleCheck,
        regulation,
        SetRegulation,
      })
    );
  };

  //==============유효성 검사==========================
  const onValidity = (event) => {
    const { id } = event.target;

    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userEmailCurrent = userEmailRef.current;
    const userNickNameCurrent = userNickNameRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const userPasswordCheckCurrnet = PasswordCheckRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const emailValue = userEmailCurrent.value;
    const nickNameValue = userNickNameCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const passwordCheckValue = userPasswordCheckCurrnet.value;

    if (id === "userName") {
      if (nameValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorName: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorName: "bg-inputBoxFocus",
        }));
      }
      nameValidationTest(userNameCurrent);
    } else if (id === "userEmail") {
      if (emailValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorEmail: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorEmail: "bg-inputBoxFocus",
        }));
      }
      emailValidationTest(userEmailCurrent);
    } else if (id === "userNickName") {
      if (nickNameValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorNickname: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorNickname: "bg-inputBoxFocus",
        }));
      }
      nickNameValidationTest(userNickNameCurrent);
    } else if (id === "userPassword") {
      if (passwordValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBoxFocus",
        }));
      }
      passwordValidationTest(userPasswordCurrent);
    } else if (id === "passwordCheck") {
      if (passwordCheckValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBoxFocus",
        }));
      }
      passwordCheckValidationTest(userPasswordCheckCurrnet);
    }
  };

  //=======================회원가입=============================
  const onSubmit = (event) => {
    event.preventDefault();

    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userEmailCurrent = userEmailRef.current;
    const userNickNameCurrent = userNickNameRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const passwordCheckCurrent = PasswordCheckRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const emailValue = userEmailCurrent.value;
    const nickNameValue = userNickNameCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const passwordCheckValue = passwordCheckCurrent.value;

    if (nameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "이름을 입력해주세요.",
      }));
      userNameCurrent.focus();
      return;
    } else {
      nameValidationTest(userNameCurrent);
      if (regulation.regulationName !== "") {
        return;
      }
    }

    if (emailValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      userEmailCurrent.focus();
      return;
    } else {
      emailValidationTest(userEmailCurrent);
      if (!doubleCheck.emailDoubleCheck) {
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "이메일 중복확인 해주세요.",
        }));
        userEmailCurrent.focus();
        return;
      }
      if (regulation.regulationEmail !== "") {
        return;
      }
    }

    if (nickNameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    } else {
      nickNameValidationTest(userNickNameCurrent);
      if (!nickNameDoubleCheck) {
        SetRegulation(() => ({
          ...regulation,
          regulationNickName: "닉네임 중복확인 해주세요.",
        }));
        userNickNameCurrent.focus();
        return;
      }
      if (regulation.regulationNickName !== "") {
        return;
      }
    }

    if (passwordValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "비밀번호를 입력해주세요.",
      }));
      userPasswordCurrent.focus();
      return;
    } else {
      passwordValidationTest(userPasswordCurrent);
      if (regulation.regulationPassword !== "") {
        return;
      }
    }

    if (passwordCheckValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationPasswordCheck: "비밀번호 중복확인을 입력해주세요.",
      }));
      passwordCheckCurrent.focus();
    } else {
      if (!doubleCheck.passwordDoubleCheck) {
        SetRegulation(() => ({
          ...regulation,
          regulationPasswordCheck: "비밀번호를 확인해 주세요",
        }));
        passwordCheckCurrent.focus();
        return;
      } else {
        passwordCheckValidationTest(passwordCheckCurrent);
        if (regulation.regulationPasswordCheck !== "") {
          passwordCheckCurrent.focus();
          return;
        }
      }
    }
    sessionStorage.setItem("userName", nameValue);
    sessionStorage.setItem("nickname", nickNameValue);
    sessionStorage.setItem("email", emailValue);
    sessionStorage.setItem("password", passwordValue);
    sessionStorage.setItem("profileImage", null);
    dispatch(setSingup("emailLogin"));
    sessionStorage.setItem("singup", "emailLogin");
    navigate("/signup/setProfileImg");
  };

  useEffect(() => {
    if (singup === "emailLogin") {
      navigate("/signup/setProfileImg");
    }
  }, [dispatch, navigate, singup]);

  return (
    <>
      <div className="container">
        <div className=" grid grid-flow-row ml-[20px] mr-[20px] gap-[32px]">
          <div className=" grid grid-flow-row gap-[10px] mt-[30px]">
            <div>
              <h1 className="font-[700] text-textBlack text-[32px] mb-[10px]">
                Welcome Gnims!
              </h1>
            </div>
            <div className="font-[500] text-textBlack text-[24px] ">
              <p className="mb-[15px]">일정관리, 공유의 샛별</p>
              <p className=" leading-[23px]">그님스는 여러분을 환영해요!</p>
            </div>
          </div>
          <form className="">
            <div className="grid gird-rows-5 gap-[14px]">
              <div>
                <Label htmlFor="userName">이름</Label>
                <LoginSignupInputBox
                  type="text"
                  id="userName"
                  ref={userNameRef}
                  onChange={onValidity}
                  placeholder="사용자의 이름을 입력해주세요."
                  bgColor={style.bgColorName}
                  maxLength={11}
                />
                <div className="flex items-center h-[40px]">
                  <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                    {regulation.regulationName}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="userEmail">이메일</Label>
                <div>
                  <input
                    type="email"
                    id="userEmail"
                    ref={userEmailRef}
                    placeholder="아이디로 사용할 이메일을 입력해주세요."
                    onChange={onValidity}
                    disabled={doubleCheck.emailDoubleCheck}
                    className={`${style.bgColorEmail} w-full px-1 h-[50px] text-[16px]  placeholder-inputPlaceHoldText`}
                    autoComplete="off"
                  ></input>
                  <button
                    className="absolute right-[5px] mt-[18px] font-[600] text-textBlack text-[16px]"
                    onClick={onEmailDoubleCheck}
                    disabled={doubleCheck.emailDoubleCheck}
                  >
                    중복 확인
                  </button>
                </div>
                <div className="flex items-center h-[40px]">
                  <p className=" w-full font-[500] mt-[20px] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationEmail}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="userNickName">닉네임</Label>
                <div>
                  <input
                    id="userNickName"
                    ref={userNickNameRef}
                    placeholder="2~8자리 숫자,한글,영문을 입력해주세요."
                    onChange={onValidity}
                    className={`${style.bgColorNickname} w-full px-1 h-[50px] text-[16px]  placeholder-inputPlaceHoldText`}
                    disabled={nickNameDoubleCheck}
                    maxLength={8}
                    autoComplete="off"
                  ></input>
                  <button
                    className="absolute right-[5px] mt-[18px] font-[600] text-textBlack text-[16px]"
                    onClick={onNickNameCheck}
                    disabled={nickNameDoubleCheck}
                  >
                    중복 확인
                  </button>
                </div>
                <div className="flex items-center h-[40px]">
                  <p className=" w-full font-[500]  text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationNickName}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="userPassword">비밀번호</Label>
                <div>
                  <LoginSignupInputBox
                    type="password"
                    id="userPassword"
                    ref={userPasswordRef}
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                    bgColor={style.bgColorPassword}
                    maxLength={16}
                  />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationPassword}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="passwordCheck">비밀번호 확인</Label>
                <div>
                  <LoginSignupInputBox
                    type="password"
                    id="passwordCheck"
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                    ref={PasswordCheckRef}
                    bgColor={style.bgColorPasswordCheck}
                    maxLength={16}
                  />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationPasswordCheck}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={onSubmit}
                className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px] mb-[69px]"
              >
                다음
              </button>
            </div>
          </form>
          <IsModal onMoalClose={onMoalClose} message={{ ModalStr }} />
        </div>
      </div>
    </>
  );
};

export default Signup;
