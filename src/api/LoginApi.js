import { instance } from "../shared/AxiosInstance";

export const EmailLoginApi = {
  EmailLogin: async (payload) => {
    console.log(payload);
    return await instance.post("/auth/login", payload);
  },
};

export const KakaoLoginApi = {
  KakaoLogin: async (payload) => {
    console.log("카카오 페이로드", payload);
    return await instance.post("kakao/login", payload);
  },
};
