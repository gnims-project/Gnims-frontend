import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import ScheduleSlice from "../modules/ScheduleSlice";

const store = configureStore({
  reducer: { LoginSlice, ScheduleSlice },
});

export default store;
