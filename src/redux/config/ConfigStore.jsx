import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import SingupSlice from "../modules/SingupSlice";
import InvitationSlice from "../modules/InvitationSlice";

const store = configureStore({
  reducer: { LoginSlice, SingupSlice, ScheduleSlice, InvitationSlice },
});

export default store;
