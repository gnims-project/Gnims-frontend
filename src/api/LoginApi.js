import { instance } from "../redux/AxiosInstance/AxiosInstance";

export const EmailLoginApi = {
  EmailLogin: async (payload) => {
    console.log(payload);
    return await instance.post("/auth/login", payload);
  },
};
