import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ScheduleApi } from "../../api/Schedule";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  schedules: [],
  id: 0,
  cardColor: "",
  date: null,
  time: null,
  subject: "",
  content: "",
  participantsId: null,
  isLoading: false,
};

// export const __getSchedule = createAsyncThunk(
//   "schedule/getSchedules",
//   async (payload, thunkAPI) => {
//     try {
//       console.log("Slice" + payload);
//       const { data } = await ScheduleApi.getSccheduleApi(payload);
//       console.log(data.data);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch {}
//   }
// );

export const __postSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      const data = ScheduleApi.scheduleAdd(payload);
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
    // [__getSchedule.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getSchedule.fulfilled]: (state, action) => {
    //   state.schedules = action.payload;
    // },
    // [__getSchedule.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

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
