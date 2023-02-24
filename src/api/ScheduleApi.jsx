import { instance } from "../shared/AxiosInstance";

export const ScheduleApi = {
  getSccheduleApi: (payload) => {
    //const data = instance.get(`/v2-dto/users/${payload}/events`);
    const data = instance.get(`/users/${payload}/events`);
    return data;
  },

  getInfiniteScrollPage: (payload) => {
    console.log(payload.userId);
    const data = instance.get(
      `/v2-page/users/${payload.userId}/events?page=${payload.page}&size=${3}`
    );
    return data;
  },

  postScheduleApi: (payload) => {
    const data = instance.post("/events", payload);
    return data;
  },

  getPastScheduleApi: () => {
    const data = instance.get("/events/past");
    return data;
  },
  deleteScheduleApi: (payload) => {
    console.log(payload);
    const data = instance.delete(`/events/${payload}`);
    return data;
  },
};
