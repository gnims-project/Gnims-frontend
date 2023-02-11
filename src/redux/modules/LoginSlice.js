import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  reducer: {},
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

export default LoginSlice.reducer;
