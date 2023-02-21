import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ScheduleApi } from "../../api/ScheduleApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  schedules: [],
  scrollPage: 1,
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
      console.log("연결");
      const { data } = await ScheduleApi.getSccheduleApi(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const __getScrollPage = createAsyncThunk(
  "schedule/getScrollPage",
  async (payload, thunkAPI) => {
    try {
      console.log("연결");
      const { data } = await ScheduleApi.getInfiniteScrollPage(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const __postSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      const data = await ScheduleApi.postScheduleApi(payload.Schedule);
      payload.dispatch(__getSchedule(payload.userId));
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ScheduleSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    pagePlus: (state, action) => {
      state.scrollPage = action.payload + 1;
    },
  },
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
          if (schedules[i].dday > schedules[j].dday) {
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

    [__getScrollPage.pending]: (state) => {
      state.isLoading = true;
    },
    [__getScrollPage.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.data) {
        state.schedules.push(...action.payload);
      } else {
        state.isLoading = false;
      }
    },
    [__getScrollPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__postSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      // action.payload.dispatch();
    },
    [__postSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { pagePlus } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
