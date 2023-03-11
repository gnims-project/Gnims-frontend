import { createSlice } from "@reduxjs/toolkit";
import { SignupApi } from "../../api/Signup";

export const __openModal = () => {
  return async function (dispatch) {
    dispatch(openModal(true));
  };
};

export const __closeModal = () => {
  return async function (dispatch) {
    dispatch(closeModal(false));
  };
};

//닉네임 중복확인
export const __nickNameCheck = ({ nickname, setModalStr }) => {
  return async function (dispatch) {
    SignupApi.nickNameDoubleCheck({ nickname: nickname })
      .then((response) => {
        setModalStr({
          modalTitle: response.message,
          modalMessage: "",
        });
        dispatch(__openModal());
        dispatch(isNickNameDoubleCheck(true));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.status === 400) {
          if (Array.isArray(data.messages)) {
            setModalStr({
              modalTitle: "닉네임을 확인해주세요.",
              modalMessage: "올바른 형식의 닉네임이 아닙니다.",
            });
          } else {
            setModalStr({
              modalTitle: data.message,
              modalMessage: "닉네임을 확인해주세요.",
            });
          }

          dispatch(__openModal());
        } else {
          if (Array.isArray(data.messages)) {
            setModalStr({
              modalTitle: "닉네임을 확인해주세요.",
              modalMessage: data.messages,
            });
          }

          dispatch(__openModal());
        }
      });
  };
};

//회원가입
export const __sginup = async ({ username, nickname, email, password, setModalStr, onModalOpen }) => {
  await SignupApi.Signup({ username, nickname, email, password })
    .then((response) => {
      setModalStr(() => response.message);
      onModalOpen();
      window.history.back();
    })
    .catch((error) => {
      const { data } = error.response;
      if (data.status === 401) {
        setModalStr(data.message);
        onModalOpen();
      }
    });
};

const initialState = {
  userInfo: {
    username: null,
    nickname: null,
    email: null,
    password: null,
    profileImage: null,
  },
  modal: {
    isOpen: false,
  },
  singup: null,
  NameNickName: null,
  error: null,
  isLoading: false,
  message: "",
  nickNameDoubleCheck: false,
};

const SingupSlice = createSlice({
  name: "singup",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal.isOpen = action.payload;
    },
    closeModal: (state, action) => {
      state.modal.isOpen = action.payload;
    },
    userInfoState: (state, action) => {
      state.userInfo = action.payload;
    },
    setNameNickName: (state, action) => {
      state.NameNickName = action.payload;
    },
    setSingup: (state, action) => {
      state.singup = action.payload;
    },
    isNickNameDoubleCheck: (state, action) => {
      state.nickNameDoubleCheck = action.payload;
    },
  },
});

export const { userInfoState, setNameNickName, setSingup, isNickNameDoubleCheck, openModal, closeModal } =
  SingupSlice.actions;
export default SingupSlice.reducer;
