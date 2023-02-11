import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../modules/LoginSlice";

const store = configureStore({
  reducer: { LoginSlice },
});

export default store;
