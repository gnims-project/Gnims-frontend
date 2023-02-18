import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";
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
        console.log(response);
        const { email, nickname, profileImage, userId } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("profileImage", profileImage);
        alert(`${nickname}님 어서오세요.`);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
        const { data } = error.response;
        console.log(data);
        if (data.status === 401) {
          setModalStr({
            modalTitle: "ID를 찾을 수 없어요.",
            modalMessage:
              "아이디(이메일)과 비밀번호를    다시 한 번 확인해주세요.",
          });
          onModalOpen();
        }
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
      const data = await instance.post("/kakao/login", { code }).then((res) => {
        console.log("서버에서 보내는값?", res.data.data);
        const email = res.data.data.email;
        localStorage.setItem("email", email);
        localStorage.setItem("socialCode", "KAKAO");

        if (res.data.message !== "non-member") {
          const accessToken = res.headers.get("Authorization");
          const nickname = res.data.data.nickname;
          console.log(nickname);
          localStorage.setItem("token", accessToken);
          localStorage.setItem("nickname", nickname);
          alert("그님스에 오신걸 환영합니다");
          return window.location.assign("/main");

          //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
        } else if (res.data.message === "non-member") {
          alert("그님스를 이용하려면 프로필 정보를 입력해줘야합니다.");
          return window.location.assign("/signup/setProfileName");
        }
        // const accessToken = res.headers.get("Authorization");
        // const nickname = res.data.nickname;
        // const email = res.data.email;

        // // 유저 토큰,닉네임,이메일이 있다면 가져온 후 세팅
        // if (accessToken && nickname && email) {
        //   localStorage.setItem("token", accessToken);
        //   localStorage.setItem("nickname", nickname);
        //   localStorage.setItem("email", email);
        //   alert(`소셜로그인 인증 완료! ${nickname}님 환영합니다!`);
        //   return window.location.assign("/");
        // }
        // else {
        //   alert("인증 오류! 다시 시도해주세요!");
        //   return window.location.assign("/");
        // }
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
