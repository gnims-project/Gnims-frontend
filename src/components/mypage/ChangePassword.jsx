import React, { useEffect, useRef, useState } from "react";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import IsModal from "../modal/Modal";
import { useNavigate } from "react-router";
import { UserApi } from "../../api/UserApi";
import { useDispatch } from "react-redux";
import { __closeModal, __openModal } from "../../redux/modules/SingupSlice";

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
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const [InputCheck, setInputCheck] = useState({ input: false, modal: false });

  const passwordRegulationExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

  const dispatch = useDispatch();

  const onMoalClose = () => {
    dispatch(__closeModal());
    if (InputCheck.modal && userId) {
      navigator("/main");
    } else if (InputCheck.modal) {
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
      if (passwordCurrent.value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBox",
          shadowPassword: "",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBoxFocus",
          shadowPassword: "drop-shadow-inputBoxShadow",
        }));
      }

      if (passwordRegulationExp.test(passwordCurrent.value)) {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "",
        }));
      } else if (!passwordRegulationExp.test(passwordCurrent.value)) {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "?????? 8???????????? ???????????? ????????? ?????????????????????.",
        }));
      } else if (passwordCurrentCheck.value === passwordCurrent.value) {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "??????????????? ??????????????? ??????????????????.",
        }));
        passwordCurrent.focus();
        return;
      }
    } else {
      if (passwordCurrentCheck.value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBox",
          shadowPasswordCheck: "",
        }));
      } else {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBoxFocus",
          shadowPasswordCheck: "drop-shadow-inputBoxShadow",
        }));
      }

      if (passwordCurrentCheck.value === passwordCurrent.value) {
        SetRegulation(() => ({
          passwordError: "",
          passwordCheckError: "",
        }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          passwordCheckError: "??????????????? ??????????????? ??????????????????.",
        }));
        passwordCurrentCheck.focus();
        return;
      }
    }
  };

  const onSubmitPasswordChange = (event) => {
    const passwordCurrent = passwordRef.current;
    const passwordCurrentCheck = passwordCheckRef.current;

    if (passwordCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        passwordError: "??????????????? ??????????????????",
      }));
      passwordCurrent.focus();
      return;
    } else if (regulation.passwordError) {
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
        passwordCheckError: "????????????????????? ??????????????????.",
      }));
      passwordCurrentCheck.focus();
      return;
    } else if (regulation.passwordCheckError) {
      if (!passwordRegulationExp.test(passwordCurrent.value)) {
        SetRegulation(() => ({
          ...regulation,
          passwordError: "?????? 8???????????? ???????????? ????????? ?????????????????????.",
        }));
      }
      passwordCurrentCheck.focus();
      return;
    } else {
      SetRegulation(() => ({
        ...regulation,
        passwordCheckError: "",
      }));
    }

    if (passwordCurrent.value === passwordCurrentCheck.value) {
      onCangePassWordAxios({
        email: email,
        password: passwordCurrent.value,
      });
    } else {
      SetRegulation(() => ({
        ...regulation,
        passwordCheckError: "??????????????? ???????????? ????????????.",
      }));
      passwordCurrentCheck.focus();
      return;
    }
  };

  const onCangePassWordAxios = async (payload) => {
    try {
      const data = await UserApi.passwordChange(payload);
      if (data.status === 200) {
        setInputCheck({ ...InputCheck, modal: true });
        sessionStorage.removeItem("changePasswordEmail");
        setModalStr({
          ...ModalStr,
          modalTitle: "???????????? ????????? ???????????????",
          modalMessage: "????????? ??????????????? ????????? ???????????????. ",
        });
        dispatch(__openModal(dispatch));
      }
    } catch (error) {
      const { data } = error.response;
      if (data.status === 400) {
        setInputCheck({ input: false, modal: false });
        setModalStr({
          ...ModalStr,
          modalTitle: "?????????????????? ??????",
          modalMessage:
            "??????????????? ???????????? ????????????. \n ?????? ??????????????? ????????? ????????????.",
        });
        dispatch(__openModal(dispatch));
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
          <Label>??? ??????????????? ??????????????????</Label>
        </div>
        <form className="w-full">
          <div className="flex flex-col gap-[12px]">
            <div>
              <LoginSignupInputBox
                id="password"
                type="password"
                placeholder="8~16?????? ?????? ????????????,?????? ??????"
                onChange={onPassword}
                bgColor={style.bgColorPassword}
                shadow={style.shadowPassword}
                ref={passwordRef}
                maxLength={16}
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
                placeholder="??? ???????????? ??????"
                onChange={onPassword}
                bgColor={style.bgColorPasswordCheck}
                shadow={style.shadowPasswordCheck}
                ref={passwordCheckRef}
                maxLength={16}
              />
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation.passwordCheckError}
              </p>
            </div>
          </div>
          <div>
            <div
              className="mt-[65px] w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff] text-center leading-10"
              onClick={() => {
                onSubmitPasswordChange();
              }}
            >
              ??????
            </div>
          </div>
        </form>
        <IsModal message={{ ModalStr }} onMoalClose={onMoalClose} />
      </div>
    </div>
  );
};

export default ChangePassword;
