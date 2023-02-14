import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";
import SingupSlice from "../modules/SingupSlice";

const store = configureStore({
  reducer: { LoginSlice, SingupSlice },
});

export default store;
