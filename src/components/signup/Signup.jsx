import React, { useRef, useState } from "react";
//import { useDispatch } from "react-redux";

const Signup = () => {
  //const dispatch = useDispatch();

  //Ref생성
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const userNickNameRef = useRef();

  //이메일, 비밀번호, 닉네임 정규 표현식
  const emailRegulationExp =
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegulationExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;
  const nickNameReglationExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  //아이디 비밀번호가 틀렸을시 문구
  const [regulation, SetRegulation] = useState({
    regulationEmail: "",
    regulationPassword: "",
    regulationPasswordCheck: "",
    regulationNickName: "",
  });

  //중복확인여부
  const [doubleCheck, setDoubleCheck] = useState({
    emailDoubleCheck: false,
    passwordDoubleCheck: false,
    nickNameDoubleCheck: false,
  });

  //유효성검사
  const onValidity = (event) => {
    const { id, value } = event.target;
    const password = userPasswordRef.current.value;
    if (id === "email") {
      if (emailRegulationExp.test(value)) {
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "올바른 이메일 형식입니다.",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "올바른 이메일 형식이 아닙니다.",
        }));
      }
    } else if (id === "password") {
      if (passwordRegulationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationPassword: "" }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationPassword:
            "최소 8 자리에서 영대소문자와 숫자를 포함시켜주세요.",
        }));
      }
    } else if (id === "passwordCheck") {
      if (password === value) {
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
      }
    } else {
      if (nickNameReglationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationNickName: "" }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationNickName:
            "최소 2자리에서 8자리까지 한글,영문,숫자만 포함해주세요.",
        }));
      }
    }
  };

  //이메일 중복확인
  const onEmailDoubleCheck = (event) => {
    event.preventDefault();

    const emailCurrent = userEmailRef.current;
    const email = userEmailRef.currentuserNvauserPue;

    if (emailCurrent.value.trim() == "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      emailCurrent.focuse();
      return;
    }

    //dispatch(__idDoubleCheck({ email }));
  };

  //닉네임 확인하기

  //회원가입
  const onSubmit = (event) => {
    event.preventDefault();

    const userEmailCurrent = userEmailRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const userNickNameCurrent = userNickNameRef.current;
    const emailValue = userEmailCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const nickNameValue = userNickNameCurrent.value;

    if (emailValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      userEmailCurrent.focus();
      return;
    }
    //else if (!doubleCheck.emailDoubleCheck) {
    //   SetRegulation(() => ({
    //     ...regulation,
    //     regulationEmail: "이메일 중복확인 해주세요.",
    //   }));
    //   userEmailCurrent.focus();
    //   return;
    // }

    if (passwordValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "비밀번호를 입력해주세요.",
      }));
      userPasswordCurrent.focus();
      return;
    }

    if (!doubleCheck.passwordDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "비밀번호 중복확인 해주세요.",
      }));
      userPasswordCurrent.focus();
      return;
    }

    if (nickNameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    } //else if (!doubleCheck.nickNameDoubleCheck) {
    //   SetRegulation(() => ({
    //     ...regulation,
    //     regulationNickName: "닉네임 중복확인 해주세요.",
    //   }));
    //   userNickNameCurrent.focus();
    //   return;
    // }
  };

  return (
    <>
      <form>
        <div>
          <div>
            <label htmlFor="email">이메일 </label>
            <div>
              <input
                id="email"
                ref={userEmailRef}
                placeholder="아이디로 사용할 이메일을 입력해 주세요."
                onChange={onValidity}
              ></input>
              <button onClick={onEmailDoubleCheck}>중복 확인</button>
            </div>
            <p>{regulation.regulationEmail}</p>
          </div>
          <div>
            <label htmlFor="password">비밀번호 </label>
            <div>
              <input
                id="password"
                ref={userPasswordRef}
                placeholder="8~16자리 영문 대소문자, 숫자 조합"
                onChange={onValidity}
              ></input>
            </div>
            <p>{regulation.regulationPassword}</p>
          </div>
          <div>
            <label htmlFor="passwordCheck">비밀번호 확인 </label>
            <div>
              <input
                id="passwordCheck"
                placeholder="8~16자리 영문 대소문자, 숫자 조합"
                onChange={onValidity}
              ></input>
            </div>
            <p>{regulation.regulationPasswordCheck}</p>
          </div>
          <div>
            <label htmlFor="nickName">닉네임 </label>
            <div>
              <input
                id="nickName"
                ref={userNickNameRef}
                placeholder="2~8자리 숫자, 한글, 영문을 입력해주세요"
                onChange={onValidity}
              ></input>
              <button>중복 확인</button>
            </div>
          </div>
          <p>{regulation.regulationNickName}</p>
        </div>
        <div>
          <button onClick={onSubmit}>그님스 시작하기</button>
        </div>
      </form>
    </>
  );
};

export default Signup;
