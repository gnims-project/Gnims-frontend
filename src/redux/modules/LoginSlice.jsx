import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance"
import axios from "axios";

export const __emailLogin = ({ user, navigate, onModalOpen, setModalStr }) => {
  return async function (dispatch) {
    await instance
      // 백단 연결시 API : /api/user/login
      .post("/auth/login", user)
      .then((response) => {
        const accessToken = response.headers.get("Authorization");
        const { email, nickname } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("nickname", nickname);
        dispatch(isLogin(true));
        dispatch(isLoading(true));
        alert(`${nickname}님 어서오세요.`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          setModalStr("아이디 또는 비밀번호를 확인해주세요");
          onModalOpen();
        }
      });
  };
};

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
          const nickname = res.data.nickname;
          const email = res.data.email;

          //유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
          if (accessToken && nickname && email) {
            localStorage.setItem("token", accessToken);
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("email", email);
            alert(`소셜로그인 인증 완료! ${nickname}님 환영합니다!`);
            return window.location.assign("/");
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
const LoginSlice = createSlice({
  name: "login",
  initialState: {},
  reducer: {
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    userInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: {
    //로그인
    [__kakaologin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaologin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.loginCheck = true;
    },
    [__kakaologin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isLoading, isLogin, userInfo, setMessage } = LoginSlice.actions;
export default LoginSlice.reducer;
