import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ScheduleApi } from "../../api/ScheduleApi";

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

export const __getSchedule = createAsyncThunk(
  "schedule/getSchedules",
  async (payload, thunkAPI) => {
    try {
      const { data } = await ScheduleApi.getSccheduleApi(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch {}
  }
);

export const __postSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      const data = ScheduleApi.postScheduleApi(payload);

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
    [__getSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSchedule.fulfilled]: (state, action) => {
      console.log(action.payload);
      let schedules = action.payload;
      let tmp = 0;
      for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
          if (schedules[i].dday < schedules[j].dday) {
            tmp = schedules[i];
            schedules[i] = schedules[j];
            schedules[j] = tmp;
            // if (schedules[i].dday === 0) {
            //   if (schedules[i].dday > schedules[j].dday) {
            //     tmp = schedules[i];
            //     schedules[i] = schedules[j];
            //     schedules[j] = tmp;
            //   }
            // }
          }
        }
      }
      state.schedules = schedules;
    },
    [__getSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

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
