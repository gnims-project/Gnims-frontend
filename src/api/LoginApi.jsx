import { instance } from "../shared/AxiosInstance";

export const LoginApi = {
  EmailLogin: (payload) => {
    const data = instance.post("/auth/login", payload);
    return data;
  },

  KakaoLogin: async (payload) => {
    return await instance.post("kakao/login", payload);
  },

  SendEmailAuthenticationNumber: async (payload) => {
    return await instance.post("/auth/password", { email: payload });
  },

  SendAuthenticationNumber: async (payload) => {
    return await instance.patch("/auth/code", payload);
  },
};
