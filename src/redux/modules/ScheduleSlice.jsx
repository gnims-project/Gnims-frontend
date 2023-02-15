import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  id: 0,
  cardColor: "",
  date: null,
  time: null,
  subject: "",
  content: "",
  participantsId: null,
  isLoading: false,
};

export const __postSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      let Authorization = localStorage.getItem("Authorization");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Authorization}`,
        },
      };
      const data = await axios.post(
        "https://eb.jxxhxxx.shop/events",
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ScheduleSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {},
  extraReducers: {
    [__postSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSchedule.fulfilled]: (state, action) => {
      state.schedules = [...state.schedules, action.payload];
    },
    [__postSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ScheduleSlice.reducer;
