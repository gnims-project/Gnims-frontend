import { instance } from "../shared/AxiosInstance";

export const ScheduleAPI = {
  scheduleAdd: async (payload) => {
    const { data } = await instance.post("/events", payload);
    return data;
  },
};
