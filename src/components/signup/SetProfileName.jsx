import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __emailDoubleCheck,
  setNameNickName,
} from "../../redux/modules/SingupSlice";
import IsModal from "../modal/Modal";

const SetProfileName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState("");

  const userNameRef = useRef();
  const userNickNameRef = useRef();

  const { NameNickName, nickNameDoubleCheck } = useSelector(
    (state) => state.SingupSlice
  );

  useEffect(() => {
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
      <div>
        <form>
          <div>
            <div>
              <div>
                <h1>이름을 입력해주세요</h1>
              </div>
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
              <div>
                <h1>사용하실 닉네임을 입력해주세요</h1>
              </div>
              <div>
                <input
                  id="userNickName"
                  ref={userNickNameRef}
                  placeholder="2~8자리 숫자, 한글, 영문을 입력해주세요"
                  onChange={onValidity}
                ></input>
                <button onClick={onNickNameCheck}>중복 확인</button>
                <p>{regulation.regulationNickName}</p>
              </div>
            </div>
          </div>
          <div>
            <button onClick={onNavigateProfilImgPage}>다음</button>
          </div>
        </form>
        <IsModal isModalOpen={isOpen.isOpen} onMoalClose={onMoalClose}>
          {ModalStr}
        </IsModal>
      </div>
    </>
  );
};

export default SetProfileName;
