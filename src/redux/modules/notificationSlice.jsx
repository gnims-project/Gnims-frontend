import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

// 리듀서
const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    //알림 리스트에 새로운 알림을 추가
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    //알림 리스트 비우기
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, clearNotifications } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
