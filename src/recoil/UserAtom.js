import { atom } from "recoil";

export const isLoginState = atom({
  key: "isLogin",
  login: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    name: "",
    email: "",
    nickname: "",
  },
});


