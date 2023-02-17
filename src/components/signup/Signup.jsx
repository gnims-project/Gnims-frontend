import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../../api/Signup";
import TopNavTitleBar from "../layout/TopNavTitleBar";
import IsModal from "../modal/Modal";
import {
  __nickNameCheck,
  userInfoState,
  setSingup,
} from "../../redux/modules/SingupSlice";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/LoginSignupInputBox";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const { singup } = useSelector((state) => state.SingupSlice);
  const { nickNameDoubleCheck } = useSelector((state) => state.SingupSlice);

  //회원가입 전에 user정보가 redux에 있는지 확인 후 실행
  useEffect(() => {
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

  const [hidden, Sethidden] = useState({
    hiddenErrorMeassageName: true,
    hiddenErrorMeassaEmail: true,
    hiddenErrorMeassaNickName: true,
    hiddenErrorMeassaName: true,
    hiddenErrorMeassaPassword: true,
    hiddenErrorMeassaPasswordCheck: true,
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
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaName: false,
        }));
      } else {
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaName: true,
        }));
      }
    } else if (id === "userEmail") {
      if (emailRegulationExp.test(value)) {
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "올바른 이메일 형식입니다.",
        }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaEmail: false,
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "올바른 이메일 형식이 아닙니다.",
        }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaEmail: false,
        }));
      }
    } else if (id === "userNickName") {
      if (nickNameReglationExp.test(value)) {
        //SetRegulation(() => ({ ...regulation, regulationNickName: "" }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaNickName: true,
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationNickName: "글자수 2~8자와 한글,영문,숫자만 포함해주세요.",
        }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaNickName: false,
        }));
      }
    } else if (id === "userPassword") {
      if (passwordRegulationExp.test(value)) {
        //SetRegulation(() => ({ ...regulation, regulationPassword: "" }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaPassword: true,
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationPassword:
            "최소 8 자리에서 영대소문자와 숫자를 포함시켜주세요.",
        }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaPassword: false,
        }));
      }
    } else if (id === "passwordCheck") {
      if (password === value) {
        setDoubleCheck(() => ({ ...doubleCheck, passwordDoubleCheck: true }));
        // SetRegulation(() => ({
        //   ...regulation,
        //   regulationPasswordCheck: "",
        // }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaPasswordCheck: true,
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationPasswordCheck: "비밀번호와 일치하는지 확인해주세요.",
        }));
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaPasswordCheck: true,
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
        setModalStr({
          modalTitle: response.message,
          modalMessage: "",
        });
        onModalOpen();
        setDoubleCheck(() => ({
          ...doubleCheck,
          emailDoubleCheck: true,
        }));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.status === 400) {
          setModalStr({
            modalTitle: data.message,
            modalMessage: "이메일을 확인해주세요.",
          });
          onModalOpen();
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
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: false,
      }));
      nickNameCurrent.focus();
      return;
    } else {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: true,
      }));
    }
    dispatch(
      __nickNameCheck({
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

  return (
    <>
      <div className="container md">
        <div className=" grid grid-flow-row ml-[20px] mr-[20px] gap-[32px]">
          <div className=" grid grid-flow-row gap-[10px] mt-[105px]">
            <div>
              <h1 className="font-[700] text-[#12396F] text-[32px] mb-[10px]">
                Welcome Gnims!
              </h1>
            </div>
            <div className="font-[500] text-[#12396F] text-[24px] ">
              <p className="mb-[15px]">일정관리, 공유의 샛별</p>
              <p>그님스는 여러분을 환영해요!</p>
            </div>
          </div>
          <form className="">
            <div className="grid gird-rows-5 gap-[20px]">
              <div>
                <Label htmlFor="userName">이름</Label>
                <LoginSignupInputBox
                  id="userName"
                  ref={userNameRef}
                  onChange={onValidity}
                  placeholder="사용자의 이름을 입력해주세요."
                />
                <div
                  className="flex items-center"
                  hidden={hidden.hiddenErrorMeassaName}
                >
                  <p className="h-[40px] w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                    {regulation.regulationName}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="userEmail">이메일</Label>
                <div>
                  <input
                    id="userEmail"
                    ref={userEmailRef}
                    placeholder="아이디로 사용할 이메일을 입력해주세요."
                    onChange={onValidity}
                    className="w-full px-1 h-[50px] text-[16px] focus:placeholder-[#12396f] placeholder-[#12396fa1]"
                  ></input>
                  <button
                    className="absolute right-[5px]  mt-[18px] font-[600] text-textNavy text-[16px]"
                    onClick={onEmailDoubleCheck}
                  >
                    중복 확인
                  </button>
                </div>
                <div hidden={hidden.hiddenErrorMeassaEmail}>
                  <p className=" w-full font-[500] mt-[20px] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationEmail}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="userNickName">닉네임</Label>
                <input
                  id="userNickName"
                  ref={userNickNameRef}
                  placeholder="2~8자리 숫자,한글,영문을 입력해주세요."
                  onChange={onValidity}
                  className="w-full px-1 h-[50px] text-[16px] focus:placeholder-[#12396f] placeholder-[#12396fa1]"
                ></input>
                <button
                  className="absolute right-[24px]  mt-[18px] font-[600] text-textNavy text-[16px]"
                  onClick={onNickNameCheck}
                >
                  중복 확인
                </button>
                <div hidden={hidden.hiddenErrorMeassaNickName}>
                  <p className=" w-full font-[500] mt-[20px] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationNickName}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="userPassword">비밀번호</Label>
                <div>
                  <LoginSignupInputBox
                    id="userPassword"
                    ref={userPasswordRef}
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                  />
                </div>
                <div
                  hidden={hidden.hiddenErrorMeassaPassword}
                  className="mt-[10px]"
                >
                  <p className="w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationPassword}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="passwordCheck">비밀번호 확인</Label>
                <div>
                  <LoginSignupInputBox
                    id="passwordCheck"
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                  />
                </div>
                <div
                  hidden={hidden.hiddenErrorMeassaPasswordCheck}
                  className="mt-[10px]"
                >
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
                회원가입 완료
              </button>
            </div>
          </form>
          <IsModal
            isModalOpen={isOpen.isOpen}
            onMoalClose={onMoalClose}
            message={{ ModalStr }}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
