import { instance } from "../shared/AxiosInstance";

export const LoginApi = {
  EmailLogin: (payload) => {
    const data = instance.post("/auth/login", payload);
    return data;
  },

  KakaoLogin: async (payload) => {
    console.log("카카오 페이로드", payload);
    return await instance.post("kakao/login", payload);
  },
};
