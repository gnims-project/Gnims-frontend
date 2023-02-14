import { instance } from "../shared/AxiosInstance";

export const SignupApi = {
  emailDoubleCheck: async (payload) => {
    const { data } = await instance.post("/auth/email", payload);
    return data;
  },
  nickNameDoubleCheck: async (payload) => {
    const { data } = await instance.post("/auth/nickname", payload);
    return data;
  },
  
  Signup: async (payload) => {
    const { data } = await instance.post("/auth/signup", payload);
    return data;
  },
};
