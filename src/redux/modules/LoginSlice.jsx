import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";
import axios from "axios";
import { LoginApi } from "../../api/LoginApi";
import { setSingup } from "./SingupSlice";

//이메일 로그인

export const __emailLogin = createAsyncThunk(
  "login/EmailLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await LoginApi.EmailLogin({
        email: payload.email,
        password: payload.password,
      });
      console.log(data);
      const accessToken = data.headers.get("Authorization");
      const { email, nickname, profileImage, userId } = data.data.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("nickname", nickname);
      sessionStorage.setItem("profileImage", profileImage);
      alert(`${nickname}님 어서오세요.`);
      window.location.href = "/main";
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      console.log(data);
      if (data.status === 401) {
        payload.setModalStr({
          modalTitle: "ID를 찾을 수 없어요.",
          modalMessage: "이메일와 비밀번호를  \n  다시 한 번 확인해주세요.",
        });
        payload.onModalOpen();
      }
    }
  }
);

//카카오 로그인
export const __kakaologin = createAsyncThunk(
  "kakaologin",
  //전달 받은 코드 비동기로 처리
  async (code, thunkAPI) => {
    try {
      console.log("페이로드?", code);
      const data = await instance
        .post("social/kakao-login", { code })
        .then((res) => {
          console.log("서버에서 보내는값?", res.data.data);
          const email = res.data.data.email;
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("socialCode", "KAKAO");

          if (res.data.message !== "non-member") {
            const accessToken = res.headers.get("Authorization");
            const nickname = res.data.data.nickname;
            const userId = res.data.data.userId;
            console.log(nickname);
            sessionStorage.setItem("token", accessToken);
            sessionStorage.setItem("nickname", nickname);
            sessionStorage.setItem("userId", userId);

            alert("그님스에 오신걸 환영합니다");
            return window.location.assign("/main");

            //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
          } else if (res.data.message === "non-member") {
            alert("그님스를 이용하려면 프로필 정보를 입력해줘야합니다.");
            return window.location.assign("/signup/setProfileName");
          }
        });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.location.assign("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  error: null,
  isLoading: false,
  message: "",
  email: "",
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: {
    //카카오 소셜로그인
    [__kakaologin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaologin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginCheck = true;
      state.email = action.payload;
    },
    [__kakaologin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isLoading, isLogin, setMessage } = LoginSlice.actions;
export default LoginSlice.reducer;
