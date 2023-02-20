import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import ScheduleSlice from "../modules/ScheduleSlice";
import SingupSlice from "../modules/SingupSlice";
import InvitationSlice from "../modules/InvitationSlice";
import FollowSlice from "../modules/FollowSlice";

const store = configureStore({
  reducer: {
    LoginSlice,
    SingupSlice,
    ScheduleSlice,
    InvitationSlice,
    FollowSlice,
  },
});

export default store;
