// import { createSlice } from "@reduxjs/toolkit";
// import { instance } from "../AxiosInstance/axiosInstance";

// export const __emailLogin = ({ user, navigate, onModalOpen, setModalStr }) => {
//   return async function (dispatch) {
//     await instance
//       // 백단 연결시 API : /api/user/login
//       .post("/auth/login", user)
//       .then((response) => {
//         const accessToken = response.headers.get("Authorization");
//         const { email, nickname } = response.data;
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("email", email);
//         localStorage.setItem("nickname", nickname);
//         dispatch(isLogin(true));
//         dispatch(isLoading(true));
//         alert(`${nickname}님 어서오세요.`);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response.status === 401) {
//           setModalStr("아이디 또는 비밀번호를 확인해주세요");
//           onModalOpen();
//         }
//       });
//   };
// };

// const initialState = {
//   userInfo: [],
//   error: null,
//   isLoading: false,
//   message: "",
// };

// export const loginSlice = createSlice({
//   name: "userLogin",
//   initialState,
//   reducers: {
//     isLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     isLogin: (state, action) => {
//       state.isLogin = action.payload;
//     },
//     userInfo: (state, action) => {
//       state.userInfo = action.payload;
//     },
//     setMessage: (state, action) => {
//       state.message = action.payload;
//     },
//   },
// });
// export const { isLoading, isLogin, userInfo, setMessage } = loginSlice.actions;
// export default loginSlice.reducer;
