import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginApi } from "../../api/LoginApi";
import { setSingup } from "./SingupSlice";
//이메일 로그인
export const __emailLogin = ({
  email,
  password,
  navigate,
  onModalOpen,
  setModalStr,
}) => {
  return async function (dispatch) {
    await LoginApi.EmailLogin({ email: email, password: password })
      .then((response) => {
        const accessToken = response.headers.get("Authorization");
        const { email, nickname, profileImage } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileImage", profileImage);
        alert(`${nickname}님 어서오세요.`);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
        // const { data } = error.response;
        // console.log(data);
        // if (data.status === 401) {
        //   setModalStr(data.message);
        //   onModalOpen();
        // }
      });
  };
};

//카카오 로그인
export const __kakaologin = createAsyncThunk(
  "kakaologin",
  //전달 받은 코드 비동기로 처리
  async (code, thunkAPI) => {
    try {
      console.log("페이로드?", code);
      const data = await axios
        .post("https://eb.jxxhxxx.shop/kakao/login", { code })
        .then((res) => {
          console.log("서버로 보내는값?", res.data);
          const accessToken = res.headers.get("Authorization");
          const email = res.data.email;
          navigator("");
          //유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
          if (accessToken && email) {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("email", email);
            return window.location.assign("/profilNickName");
          } else {
            alert("인증 오류! 다시 시도해주세요!");
            return window.location.assign("/");
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
