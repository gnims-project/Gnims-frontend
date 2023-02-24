import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __nickNameCheck,
  setNameNickName,
} from "../../redux/modules/SingupSlice";
import Label from "../layout/Label";
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

  const [style, setStyle] = useState({
    bgColorName: "bg-inputBox",
    bgColorNickname: "bg-inputBox",
    shadowName: "",
    shadowNickname: "",
  });

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
      setStyle(() => ({
        ...style,
        bgColorName: "bg-inputBoxFocus",
        shadowName: "drop-shadow-inputBoxShadow",
      }));
      if (value.trim() === "") {
        setStyle(() => ({
          bgColorName: "bg-inputBox",
          shadowName: "",
        }));
      }
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
      setStyle(() => ({
        ...style,
        bgColorNickname: "bg-inputBoxFocus",
        shadowNickname: "drop-shadow-inputBoxShadow",
      }));
      if (value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorNickname: "bg-inputBox",
          shadowNickname: "",
        }));
      }
      if (nickNameReglationExp.test(value)) {
        SetRegulation(() => ({ ...regulation, regulationNickName: "" }));
      } else {
        SetRegulation(() => ({
          ...regulation,
          regulationNickName: "2자리에서 8자리 한글,영문,숫자만 포함해주세요.",
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
        <div className="grid grid-flow-row gap-[9px]  ml-[20px] mr-[20px] mt-[36px]">
          <div className="font-[700] text-[32px] text-textBlack">
            <h1>그남스 여정 준비 시작!</h1>
          </div>
          <div className="text-textBlack font-[400] text-[24px]">
            <label htmlFor="userName" className="cursor-pointer ">
              <p> 그님스 이용을 위해 </p>
              <p>프로필 정보를 설정해주세요.</p>
            </label>
          </div>
        </div>
        <form className="grid grid-flow-row ml-[20px] mr-[20px] mt-[36px]">
          <div className="grid grid-rows-2 ">
            <div>
              <div className="h-[40px] flex items-center">
                <div>
                  <Label>이름</Label>
                </div>
              </div>
              <div>
                <LoginSignupInputBox
                  type="text"
                  id="userName"
                  ref={userNameRef}
                  placeholder="사용자의 이름을 입력해주세요."
                  onChange={onValidity}
                  bgColor={style.bgColorName}
                />
              </div>
              <div>
                <p className="h-[40px] w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                  {regulation.regulationNick}
                </p>
              </div>
            </div>
            <div>
              <div className="h-[40px] flex items-center">
                <div>
                  <Label>닉네임</Label>
                </div>
              </div>
              <div className=" relative">
                <input
                  type="text"
                  id="userNickName"
                  ref={userNickNameRef}
                  placeholder="2~8자리 숫자,한글,영문을 입력해주세요."
                  onChange={onValidity}
                  className={`${style.bgColorNickname} ${style.shadowNickname} w-full px-1 h-[50px] text-[16px]  placeholder-inputPlaceHoldText`}
                  bgColor={style.bgColorNickname}
                ></input>
                <button
                  className="absolute right-[8px]  mt-[18px] font-[600] text-textBlack text-[16px]"
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
