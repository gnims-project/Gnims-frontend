import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import SingupSlice from "../modules/SingupSlice";

const store = configureStore({
  reducer: { LoginSlice, SingupSlice, ScheduleSlice },
});

export default store;
