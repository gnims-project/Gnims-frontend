import { async } from "q";
import { instance } from "../shared/AxiosInstance";

export const UserApi = {
  userSearch: async (payload) => {
    const { data } = await instance.get(
      `/users/search?username=${payload}&page=${0}&size=${10}`,
      payload
    );
    return data;
  },
  editProfile: async (payload) => {
    const data = await instance.patch("users/profile", payload);
    return data;
  },
  passwordChange: async (payload) => {
    const { data } = await instance.patch("/auth/password", payload);
    return data;
  },
};
