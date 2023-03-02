import React, { useEffect, useRef, useState } from "react";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import IsModal from "../modal/Modal";
import { useNavigate } from "react-router";
import { UserApi } from "../../api/UserApi";

const ChangePassword = () => {
  const navigator = useNavigate();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  const email = sessionStorage.getItem("changePasswordEmail");
  const userId = sessionStorage.getItem("userId");

  const [style, setStyle] = useState({
    bgColorPassword: "bg-inputBox",
    shadowPassword: "",
    bgColorPasswordCheck: "bg-inputBox",
    shadowPasswordCheck: "",
  });
  const [regulation, SetRegulation] = useState({
    passwordError: "",
    passwordCheckError: "",
  });
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });
  const [isLoding, setIsLoding] = useState(false);
  const [InputCheck, setInputCheck] = useState({ input: false, modal: false });
  const [dobleChcek, setDoubleCheck] = useState(false);

  const passwordRegulationExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;

  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
    if (InputCheck.modal && userId) {
      navigator("/main");
    } else if (InputCheck.modal && email) {
      navigator("/login");
    } else if (!InputCheck.input && !InputCheck.modal) {
      navigator("/login/auth/InputEmail");
    }
  };

  const onPassword = (event) => {
    const { id } = event.target;
    const passwordCurrent = passwordRef.current;
    const passwordCurrentCheck = passwordCheckRef.current;

    if (id === "password") {
      console.log("event");
      setStyle(() => ({
        ...style,
        bgColorPassword: "bg-inputBoxFocus",
        shadowPassword: "drop-shadow-inputBoxShadow",
      }));
      if (passwordCurrent.value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBox",
          shadowPassword: "",
        }));
      }
      if (passwordRegulationExp.test(passwordCurrent.value)) {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "최소 8 자리에서 영대소문자와 숫자를 포함시켜주세요.",
        }));

        passwordCurrent.focus();
        return;
      }
      if (passwordCurrentCheck.value === passwordCurrent.value) {
        setDoubleCheck(() => true);
        SetRegulation(() => ({
          ...regulation,
          passwordError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "비밀번호와 일치하는지 확인해주세요.",
        }));
        setDoubleCheck(() => false);
        passwordCurrent.focus();
        return;
      }
    } else {
      setStyle(() => ({
        ...style,
        bgColorPasswordCheck: "bg-inputBoxFocus",
        shadowPasswordCheck: "drop-shadow-inputBoxShadow",
      }));
      if (passwordCurrentCheck.value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBox",
          shadowPasswordCheck: "",
        }));
      }
      if (passwordCurrentCheck.value === passwordCurrent.value) {
        setDoubleCheck(() => true);
        SetRegulation(() => ({
          passwordError: "",
          passwordCheckError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          passwordCheckError: "비밀번호와 일치하는지 확인해주세요.",
        }));
        setDoubleCheck(() => false);
        passwordCurrentCheck.focus();
        return;
      }
    }
  };
  const onSubmitPasswordChange = (event) => {
    event.preventDefault();

    const passwordCurrent = passwordRef.current;
    const passwordCurrentCheck = passwordCheckRef.current;

    if (passwordCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        passwordError: "비밀번호를 입력해주세요",
      }));
      passwordCurrent.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        passwordError: "",
      }));
    }
    if (passwordCurrentCheck.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        passwordCheckError: "비밀번확인란에 입력해주세요.",
      }));
      passwordCurrentCheck.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        passwordCheckError: "",
      }));
    }

    if (dobleChcek) {
      onCangePassWordAxios({
        email: email,
        password: passwordCurrent.value,
      });
    } else {
      SetRegulation(() => ({
        ...regulation,
        passwordCheckError: "비밀번호가 일치하지 않습니다.",
      }));
      passwordCurrentCheck.focus();
      return;
    }
  };

  const onCangePassWordAxios = async (payload) => {
    try {
      setIsLoding(() => true);
      onModalOpen();
      const data = await UserApi.passwordChange(payload);
      setIsLoding(() => false);
      console.log(data);
      if (data.status === 200) {
        sessionStorage.removeItem("changePasswordEmail");
        setInputCheck(() => ({ ...InputCheck, modal: true }));
        setModalStr(() => ({
          ...ModalStr,
          modalTitle: "비밀번호 변경을 성공했어요",
          modalMessage: "새로운 비밀번호로 변경이 되었습니다. ",
        }));
      }
    } catch (error) {
      const { data } = error.response;
      setIsLoding(() => false);
      if (data.status === 400) {
        setInputCheck(() => ({ input: false, modal: false }));
        setModalStr(() => ({
          ...ModalStr,
          modalTitle: "비밀번호변경 실패",
          modalMessage:
            "인증번호가 유효하지 않습니다. \n 다시 인증요청을 재시도 해주세요.",
        }));
      }
    }
  };

  useEffect(() => {
    const changePasswordEmail = sessionStorage.getItem("changePasswordEmail");
    if (!changePasswordEmail) {
      navigator("/login/auth/InputEmail");
    }
  }, []);

  return (
    <div className="container ">
      <div className=" grid grid-flow-row ml-[20px] mr-[20px] mt-[55px]">
        <div className="mb-[4px]">
          <Label>새 비밀번호를 입력해주세요</Label>
        </div>
        <form className="w-full">
          <div className="flex flex-col gap-[12px]">
            <div>
              <LoginSignupInputBox
                id="password"
                type="password"
                placeholder="8~16자리 영문 대소문자,숫자 조합"
                onChange={onPassword}
                bgColor={style.bgColorPassword}
                shadow={style.shadowPassword}
                ref={passwordRef}
              />
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation.passwordError}
              </p>
            </div>
            <div>
              <LoginSignupInputBox
                id="passwordCheck"
                type="password"
                placeholder="새 비밀번호 확인"
                onChange={onPassword}
                bgColor={style.bgColorPasswordCheck}
                shadow={style.shadowPasswordCheck}
                ref={passwordCheckRef}
              />
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation.passwordCheckError}
              </p>
            </div>
          </div>
          <div>
            <button
              className="mt-[65px] w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff]"
              onClick={onSubmitPasswordChange}
            >
              확인
            </button>
          </div>
        </form>
        <IsModal
          isModalOpen={isOpen.isOpen}
          onMoalClose={onMoalClose}
          message={{ ModalStr }}
          isLoding={isLoding}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
