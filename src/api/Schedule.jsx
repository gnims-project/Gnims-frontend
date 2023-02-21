import { instance } from "../shared/AxiosInstance";

export const ScheduleApi = {
  scheduleAdd: async (payload) => {
    const { data } = await instance.post("/events", payload);
    return data;
  },
};
