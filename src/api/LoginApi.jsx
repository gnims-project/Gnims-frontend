import { instance } from "../shared/AxiosInstance";

export const EmailLoginApi = {
  EmailLogin: async (payload) => {
    const { data } = await instance.post("/auth/login", payload);
    return data;
  },
};

/*=============================================================
===============================================================*/
