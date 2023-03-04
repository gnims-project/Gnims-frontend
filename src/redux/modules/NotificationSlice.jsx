import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [], // 알림 목록을 담을 배열
  unreadCount: 0, // 읽지 않은 알림 수
};

const NotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      // isChecked=false인 알림 수 증가
      state.unreadCount += 1;
    },
  },
});

// 액션 생성자 함수
export const { addNotification } = NotificationSlice.actions;

// 리듀서
export default NotificationSlice.reducer;
