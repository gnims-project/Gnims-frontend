import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ScheduleApi } from "../../api/ScheduleApi";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  schedules: [],
  pastSchedules: [],
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
export const __deleteSchedule = createAsyncThunk(
  "schedule/delete",
  async (id) => {
    console.log(id[0]);
    const response = await ScheduleApi.deleteScheduleApi(id[0]);
    id[2](__getSchedule(id[1]));
    return response.data;
  }
);

export const __getSchedule = createAsyncThunk(
  "schedule/getSchedules",
  async (payload, thunkAPI) => {
    try {
      console.log("연결");
      const { data } = await ScheduleApi.getSccheduleApi(payload);
      console.log(data.data);
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
      console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
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
      console.log(payload.userId);
      payload.dispatch(__getSchedule(payload.userId));
      // return thunkAPI.fulfillWithValue(data.data);
      if (data.status === 201) {
        alert("성공!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPastSchedlue = createAsyncThunk(
  "schedule/getPastSchedlue",
  async (payload, thunkAPI) => {
    try {
      console.log("연결");
      const { data } = await ScheduleApi.getPastScheduleApi();
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error.response.status);
      const errorStatus = error.response.status;

      if (errorStatus === 500) {
        window.alert("서버에 문제가 생겼습니다.");
      }
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
      state.isLoading = false;
      console.log(action.payload);
      let schedules = action.payload;
      let tmp = 0;
      for (let i = 0; i < schedules.length - 1; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
          if (schedules[i].dday > schedules[j].dday) {
            tmp = schedules[i];
            schedules[i] = schedules[j];
            schedules[j] = tmp;
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
      console.log(action.payload);
      state.schedules = action.payload;
    },
    [__getScrollPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getPastSchedlue.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPastSchedlue.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.pastSchedules = action.payload;
    },

    [__getPastSchedlue.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // [__deleteSchedule.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__deleteSchedule.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    // },
    // [__deleteSchedule.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // },
  },
});

export const { pagePlus } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
