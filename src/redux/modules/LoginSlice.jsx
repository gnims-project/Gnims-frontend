import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";
import { LoginApi } from "../../api/LoginApi";
import { __openModal } from "./SingupSlice";

//이메일 로그인

export const __emailLogin = createAsyncThunk(
  "login/EmailLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await LoginApi.EmailLogin({
        email: payload.email,
        password: payload.password,
      });

      const accessToken = data.headers.get("Authorization");
      const { email, nickname, profileImage, userId } = data.data.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("nickname", nickname);
      sessionStorage.setItem("profileImage", profileImage);
      payload.setModalStr({
        modalTitle: `${nickname}님 어서오세요.`,
        modalMessage: `오늘도 그님스와 함께\n행복한 하루 보내세요.`,
      });
      payload.dispatch(__openModal(payload.dispatch));
      // window.location.href = "/main";
    } catch (error) {
      const { data } = error.response;
      if (data.status === 401) {
        payload.setModalStr({
          modalTitle: "ID를 찾을 수 없어요.",
          modalMessage: "이메일와 비밀번호를  \n  다시 한 번 확인해주세요.",
        });
        payload.dispatch(__openModal(payload.dispatch));
      } else {
        payload.setModalStr({
          modalTitle: "ID를 찾을 수 없어요.",
          modalMessage: "이메일와 비밀번호를  \n  다시 한 번 확인해주세요.",
        });
        payload.dispatch(__openModal(payload.dispatch));
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
      const data = await instance
        .post("social/kakao-login", { code })
        .then((res) => {
          const email = res.data.data.email;
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("socialCode", "KAKAO");
          if (res.data.message !== "non-member") {
            const accessToken = res.headers.get("Authorization");
            const nickname = res.data.data.nickname;
            const userId = res.data.data.userId;
            const profileImage = res.data.data.profileImage;
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("nickname", nickname);
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("profileImage", profileImage);
            sessionStorage.setItem("socialCode", "social");
            alert("그님스에 오신걸 환영합니다");
            return window.location.assign("/main");

            //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
          } else if (res.data.message === "non-member") {
            alert("그님스를 이용하려면 프로필 정보를 입력해줘야합니다.");
            return window.location.assign("/signup/setProfileName");
          }
        });
      // return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.location.assign("/");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __sendEmail = createAsyncThunk(
  "sendEamil",
  async ({ email, setModalStr }, thunkAPI) => {
    try {
      const data = await LoginApi.SendEmailAuthenticationNumber(email);
      if (data.status === 200) {
        sessionStorage.setItem("changePasswordEmail", email);
        setModalStr({
          modalTitle: "이메일함을 확인해주세요",
          modalMessage: "인증번호를 입력해주세요",
        });
        return thunkAPI.fulfillWithValue(data.data);
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      const { data } = error.response;
      if (data.status === 400) {
        setModalStr({
          modalTitle: data.message,
          modalMessage: "이메일을 확인해주세요.",
        });
        return thunkAPI.rejectWithValue(data);
      }
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const __NextPage = createAsyncThunk(
  "onSubnitNextPage",
  async ({ dispatch, setModalStr, email, code }, thunkAPI) => {
    try {
      dispatch(__openModal(dispatch));
      const { data } = await LoginApi.SendAuthenticationNumber({ email, code });

      if (data.status === 200) {
        setModalStr({
          modalTitle: data.message,
          modalMessage: "",
        });
        sessionStorage.setItem("changePasswordEmail", email);
        return thunkAPI.fulfillWithValue(data.data);
      }
    } catch (error) {
      const { data } = error.response;
      if (data.status === 400) {
        setModalStr(() => ({
          modalTitle: "인증번호 실패",
          modalMessage: `인증번호가 잘못 입력되었습니다. \n 인증요청을 재시도 해주세요.`,
        }));
        dispatch(__openModal(dispatch));
        return thunkAPI.rejectWithValue(data);
      }
      dispatch(__openModal(dispatch));
      return thunkAPI.rejectWithValue(data);
    }
  }
);
const initialState = {
  error: null,
  isLoading: false,
  message: "",
  email: "",
  emailCheck: false,
  check: {
    emailCheck: false,
    authenticationNumberCheck: false,
  },
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
    resetCheck: (state) => {
      state.check.emailCheck = false;
      state.check.authenticationNumberCheck = false;
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
    [__sendEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [__sendEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.check.emailCheck = true;
    },
    [__sendEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__NextPage.pending]: (state) => {
      state.isLoading = true;
    },
    [__NextPage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.check.authenticationNumberCheck = true;
    },
    [__NextPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isLoading, isLogin, setMessage, resetCheck } =
  LoginSlice.actions;
export default LoginSlice.reducer;
