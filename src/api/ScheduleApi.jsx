import { instance } from "../shared/AxiosInstance";

export const ScheduleApi = {
  getSccheduleApi: (payload) => {
    console.log(payload);
    const data = instance.get(`/users/${payload}/events`);
    return data;
  },
  postScheduleApi: (payload) => {
    const data = instance.post("/events", payload);
    return data;
  },
};
