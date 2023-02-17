import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __nickNameCheck,
  setNameNickName,
} from "../../redux/modules/SingupSlice";
import LoginSignupInputBox from "../layout/LoginSignupInputBox";
import IsModal from "../modal/Modal";

const SetProfileName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const userNameRef = useRef();
  const userNickNameRef = useRef();

  const { NameNickName, nickNameDoubleCheck } = useSelector(
    (state) => state.SingupSlice
  );

  useEffect(() => {
    //로컬스토리지
    console.log("실행");
    console.log(NameNickName);
    if (NameNickName !== null) {
      navigate("/signup/setProfileImg");
    }
  }, [dispatch, NameNickName, navigate]);

  const nameRegulationExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
  const nickNameReglationExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  //아이디 비밀번호가 틀렸을시 문구
  const [regulation, SetRegulation] = useState({
    regulationName: "",
    regulationNickName: "",
  });

  //유효성검사
  const onValidity = (event) => {
    const { id, value } = event.target;
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

  //모달창
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  const onNickNameCheck = (event) => {
    event.preventDefault();
    const nickNameCurrent = userNickNameRef.current;
    console.log(nickNameCurrent);
    if (nickNameCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      nickNameCurrent.focus();
      return;
    }
    dispatch(
      __nickNameCheck({
        nickname: nickNameCurrent.value,
        onModalOpen,
        setModalStr,
      })
    );
  };

  const onNavigateProfilImgPage = (event) => {
    event.preventDefault();
    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userNickNameCurrent = userNickNameRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const nickNameValue = userNickNameCurrent.value;

    if (userNameCurrent) {
      if (nameValue.trim() === "") {
        SetRegulation(() => ({
          ...regulation,
          regulationName: "이름을 입력해주세요.",
        }));
        userNameCurrent.focus();
        return;
      } else if (!nameRegulationExp.test(nameValue)) {
        SetRegulation(() => ({
          ...regulation,
          regulationName: "한글 또는 영어로 작성해주세요.",
        }));
        userNameCurrent.focus();
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
    } else if (!nickNameDoubleCheck) {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임 중복확인 해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    }

    dispatch(setNameNickName({ nickname: nickNameValue, username: nameValue }));
  };
  return (
    <>
      <div className="container md ">
        <form className="grid grid-flow-row ml-[20px] mr-[20px] mt-[101px]">
          <div className="grid grid-rows-2 gap-[10px]">
            <div>
              <div className="h-[40px] flex items-center">
                <div>
                  <label
                    htmlFor="userName"
                    className="text-[16px] cursor-pointer text-[#12396F] font-[500]"
                  >
                    이름을 입력해주세요.
                  </label>
                </div>
              </div>
              <div>
                <LoginSignupInputBox
                  id="userName"
                  ref={userNameRef}
                  placeholder="사용자의 이름을 입력해주세요."
                  onChange={onValidity}
                />
              </div>
              <p className="h-[40px] w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                {regulation.regulationName}
              </p>
            </div>
            <div>
              <div className="h-[40px] flex items-center">
                <div>
                  <label
                    htmlFor="userNickName"
                    className="cursor-pointer text-[#12396F] font-[500]"
                  >
                    사용하실 닉네임을 입력해주세요.
                  </label>
                </div>
              </div>
              <div>
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

                <p className="h-[40px] w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                  {regulation.regulationNickName}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={onNavigateProfilImgPage}
              className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px]"
            >
              다음
            </button>
          </div>
        </form>
        <IsModal
          isModalOpen={isOpen.isOpen}
          onMoalClose={onMoalClose}
          message={{ ModalStr }}
        />
      </div>
    </>
  );
};

export default SetProfileName;
