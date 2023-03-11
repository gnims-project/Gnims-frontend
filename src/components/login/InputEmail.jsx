import React, { useState } from "react";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import IsModal from "../modal/Modal";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  __sendEmail,
  __NextPage,
  resetCheck,
} from "../../redux/modules/LoginSlice";
import {
  __openModal,
  __closeModal,
} from "../../redux/modules/SingupSlice";
import { useEffect } from "react";

const InputEmail = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const authenticationNumberRef = useRef();

  const { isLoading } = useSelector((state) => state.LoginSlice);

  const [style, setStyle] = useState({
    bgColorEmail: "bg-inputBox",
    bgColorAuthenticationNumber: "bg-inputBox",
  });
  const [regulation, SetRegulation] = useState({
    emailError: "",
    authenticationNumberError: "",
  });
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const { emailCheck, authenticationNumberCheck } = useSelector(
    (state) => state.LoginSlice.check
  );
  const onMoalClose = () => {
    dispatch(__closeModal());
    if (authenticationNumberCheck) {
      navigator("/ChangePassword");
    }
  };

  const onInputColor = (event) => {
    const { id, value } = event.target;
    const emailRegulationExp =
      /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (id === "email") {
      setStyle(() => ({
        ...style,
        bgColorEmail: "bg-inputBoxFocus",
      }));
      if (value === "") {
        setStyle(() => ({
          ...style,
          bgColorEmail: "bg-inputBox",
        }));
      }
      if (emailRegulationExp.test(value)) {
        SetRegulation(() => ({
          ...regulation,
          emailError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          emailError: "올바른 이메일 형식이 아닙니다.",
        }));
        event.target.focus();
        return;
      }
    } else {
      if (value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorAuthenticationNumber: "bg-inputBox",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorAuthenticationNumber: "bg-inputBoxFocus",
        }));
      }
    }
  };

  const onSendEmail = () => {
    const email = emailRef.current;
    if (email.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        emailError: "이메일을 입력해주세요",
      }));
      email.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        emailError: "",
      }));
    }

    dispatch(
      __sendEmail({
        email: email.value,
        dispatch: dispatch,
        setModalStr: setModalStr,
      })
    );
    dispatch(__openModal(dispatch));
  };

  const onSubmitNextPage = () => {
    const email = emailRef.current;
    const authenticationNumber = authenticationNumberRef.current;

    if (email.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        emailError: "이메일을 입력해주세요",
      }));
      email.focus();
      return;
    } else if (regulation.emailError) {
      email.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        emailError: "",
      }));
    }

    if (authenticationNumber.value === "") {
      SetRegulation(() => ({
        ...regulation,
        authenticationNumberError: "인증번호를 입력해주세요",
      }));
      authenticationNumber.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        authenticationNumberError: "",
      }));
    }
    if (emailCheck && !authenticationNumberCheck) {
      dispatch(
        __NextPage({
          email: email.value,
          code: authenticationNumber.value,
          dispatch: dispatch,
          setModalStr: setModalStr,
        })
      );
    } else if (!emailCheck) {
      SetRegulation(() => ({
        ...regulation,
        emailError: "이메일 중복확인을 해주세요.",
      }));
      email.focus();
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("socialCode")) {
      navigator(-1);
    }
    return () => {
      dispatch(resetCheck());
    };
  }, []);
  return (
    <div className="container ">
      <div className=" grid grid-flow-row ml-[20px] mr-[20px] mt-[55px]">
        <div className="mb-[4px]">
          <Label>비밀번호를 분실한 아이디를 입력해주세요</Label>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[20px] w-full">
              <input
                id="email"
                type={"email"}
                ref={emailRef}
                onChange={onInputColor}
                autoComplete="off"
                placeholder="아이디(이메일) 입니다."
                className={`w-[234px] px-3 h-[50px] ${style.bgColorEmail}  placeholder-inputPlaceHoldText`}
              />
              <div
                onClick={onSendEmail}
                className="bg-[#FFFFFF] h-[50px] flex items-center border-solid border-2 text-[16px] font-[600] border-[#002C51] p-[5px] rounded-[4px] cursor-pointer"
              >
                인증 요청
              </div>
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation.emailError}
              </p>
            </div>
            <div className="h-[full]">
              <LoginSignupInputBox
                id="AuthenticationNumber"
                type="text"
                placeholder="인증번호 입력"
                onChange={onInputColor}
                bgColor={style.bgColorAuthenticationNumber}
                ref={authenticationNumberRef}
              />
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation.authenticationNumberError}
              </p>
            </div>
          </div>
          <div>
            <button
              className="mt-[65px] w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff]"
              onClick={onSubmitNextPage}
            >
              확인
            </button>
          </div>
        </div>
        <IsModal
          onMoalClose={onMoalClose}
          message={{ ModalStr }}
          isLoding={isLoading}
        />
      </div>
    </div>
  );
};

export default InputEmail;
