import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { SignupApi } from "../../api/Signup";

//이메일 중복확인
export const __emailDoubleCheck = ({ nickname, onModalOpen, setModalStr }) => {
  return async function (dispatch) {
    console.log(nickname);
    SignupApi.nickNameDoubleCheck({ nickname: nickname })
      .then((response) => {
        console.log(response);
        setModalStr(() => response.message);
        onModalOpen();
        dispatch(isNickNameDoubleCheck(true));
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.status === 400) {
          console.log(data.message);
          setModalStr(data.message);
          onModalOpen();
        } else {
          console.log(error);
        }
      });
  };
};

//회원가입
export const __sginup = async ({
  username,
  nickname,
  email,
  password,
  setModalStr,
  onModalOpen,
}) => {
  await SignupApi.Signup({ username, nickname, email, password })
    .then((response) => {
      console.log(response);
      setModalStr(() => response.message);
      onModalOpen();
      window.history.back();
    })
    .catch((error) => {
      const { data } = error.response;
      if (data.status === 401) {
        console.log(data.message);
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
    userInfoState: (state, action) => {
      console.log(action.payload);
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

export const {
  userInfoState,
  setNameNickName,
  setSingup,
  isNickNameDoubleCheck,
} = SingupSlice.actions;
export default SingupSlice.reducer;