import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../../api/Signup";
import IsModal from "../modal/Modal";
import {
  __emailDoubleCheck,
  userInfoState,
  setSingup,
} from "../../redux/modules/SingupSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState("");

  const { singup } = useSelector((state) => state.SingupSlice);
  const { nickNameDoubleCheck } = useSelector((state) => state.SingupSlice);
  console.log(nickNameDoubleCheck);

  //회원가입 전에 user정보가 redux에 있는지 확인 후 실행
  useEffect(() => {
    console.log(singup);
    if (singup === "emailLogin") {
      console.log(singup);
      navigate("/signup/setProfileImg");
    }
  }, [dispatch, navigate, singup]);

  //Ref생성
  const userNameRef = useRef();
  const userEmailRef = useRef();
  const userPasswordRef = useRef();
  const userNickNameRef = useRef();
  //이름, 이메일, 비밀번호, 닉네임 정규 표현식
  const nameRegulationExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
  const emailRegulationExp =
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegulationExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;
  const nickNameReglationExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  //아이디 비밀번호가 틀렸을시 문구
  const [regulation, SetRegulation] = useState({
    regulationName: "",
    regulationEmail: "",
    regulationPassword: "",
    regulationPasswordCheck: "",
    regulationNickName: "",
  });

  //중복확인여부
  const [doubleCheck, setDoubleCheck] = useState({
    emailDoubleCheck: false,
    passwordDoubleCheck: false,
  });

  //유효성검사
  const onValidity = (event) => {
    const { id, value } = event.target;
    const password = userPasswordRef.current.value;
    if (id === "userName") {
      if (!nameRegulationExp.test(value)) {
        SetRegulation(() => ({
          ...regulation,
          regulationName: "한글 또는 영어로 작성해주세요.",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationName: "",
        }));
      }
    } else if (id === "userEmail") {
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
    } else if (id === "userNickName") {
      if (nickNameReglationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationNickName: "" }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationNickName:
            "최소 2자리에서 8자리까지 한글,영문,숫자만 포함해주세요.",
        }));
      }
    } else if (id === "userPassword") {
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
    }
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
    }

    emailDoubleCheckAxios({
      email: emailCurrent.value,
    });
  };

  const emailDoubleCheckAxios = async (payload) => {
    await SignupApi.emailDoubleCheck(payload)
      .then((response) => {
        console.log(response);
        setModalStr(() => response.message);
        onModalOpen();
        setDoubleCheck(() => ({
          ...doubleCheck,
          emailDoubleCheck: true,
        }));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.status === 400) {
          console.log(data.message);
          setModalStr(data.message);
          onModalOpen();
          userEmailRef.current.focus();
        } else {
          console.log(error);
        }
      });
  };

  //id
  //닉네임 확인하기
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
    }
    dispatch(
      __emailDoubleCheck({
        nickname: nickNameCurrent.value,
        onModalOpen,
        setModalStr,
      })
    );
  };

  //회원가입
  const onSubmit = (event) => {
    event.preventDefault();

    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userEmailCurrent = userEmailRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const userNickNameCurrent = userNickNameRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const emailValue = userEmailCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const nickNameValue = userNickNameCurrent.value;

    if (nameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "이메일을 입력해주세요.",
      }));
      userNameCurrent.focus();
      return;
    }

    if (emailValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      userEmailCurrent.focus();
      return;
    } else if (!doubleCheck.emailDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일 중복확인 해주세요.",
      }));
      userEmailCurrent.focus();
      return;
    }

    if (nickNameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    } else if (!nickNameDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임 중복확인 해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    }

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

    dispatch(
      userInfoState({
        username: nameValue,
        nickname: nickNameValue,
        email: emailValue,
        password: passwordValue,
        profileImage: null,
      })
    );
    dispatch(setSingup("emailLogin"));
  };

  //모달창
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  // const sginupAxios = async ({ username, nickname, email, password }) => {
  //   await SignupApi.Signup({ username, nickname, email, password })
  //     .then((response) => {
  //       console.log(response);
  //       setModalStr(() => response.message);
  //       onModalOpen();
  //       window.history.back();
  //     })
  //     .catch((error) => {
  //       const { data } = error.response;
  //       if (data.status === 401) {
  //         console.log(data.message);
  //         setModalStr(data.message);
  //         onModalOpen();
  //       }
  //     });
  // };

  return (
    <>
      <form>
        <div>
          <div>
            <label htmlFor="userName">이름 </label>
            <div>
              <input
                id="userName"
                ref={userNameRef}
                placeholder="사용자의 이름을 입력해주세요."
                onChange={onValidity}
              ></input>
            </div>
            <p>{regulation.regulationName}</p>
          </div>
          <div>
            <label htmlFor="userEmail">이메일 </label>
            <div>
              <input
                id="userEmail"
                ref={userEmailRef}
                placeholder="아이디로 사용할 이메일을 입력해주세요."
                onChange={onValidity}
              ></input>
              <button onClick={onEmailDoubleCheck}>중복 확인</button>
            </div>
            <p>{regulation.regulationEmail}</p>
          </div>
          <div>
            <label htmlFor="userNickName">닉네임 </label>
            <div>
              <input
                id="userNickName"
                ref={userNickNameRef}
                placeholder="2~8자리 숫자, 한글, 영문을 입력해주세요"
                onChange={onValidity}
              ></input>
              <button onClick={onNickNameCheck}>중복 확인</button>
            </div>
          </div>
          <p>{regulation.regulationNickName}</p>
          <div>
            <label htmlFor="userPassword">비밀번호 </label>
            <div>
              <input
                id="userPassword"
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
        </div>
        <div>
          <button onClick={onSubmit}>그님스 시작하기</button>
        </div>
      </form>
      <IsModal isModalOpen={isOpen.isOpen} onMoalClose={onMoalClose}>
        {ModalStr}
      </IsModal>
    </>
  );
};

export default Signup;
