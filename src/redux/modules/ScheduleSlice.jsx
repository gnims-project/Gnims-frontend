import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ScheduleApi } from "../../api/ScheduleApi";
import { instance } from "../../shared/AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  schedules: [],
  oldschedules: [],
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

export const __getScheduleDetail = createAsyncThunk(
  "schedule/getScheduleDetail",
  async (payload, thunkAPI) => {
    try {
      console.log("연결");
      const { data } = await instance.get(`/events/${payload}`);
      console.log("디테일데이터", data);
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
      console.log("__getScrollPage실행여부", payload.page);
      const data = await ScheduleApi.getInfiniteScrollPage(payload);
      console.log(data.data);
      if (data.status === 200) {
        if (data.data.totalPage === payload.page) {
          payload.endRef.current = true;
          return thunkAPI.fulfillWithValue(data.data.data);
        }

        payload.preventRef.current = true;
        return thunkAPI.fulfillWithValue(data.data.data);
      }
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
      console.log("보내는 스케줄", payload);
      const data = await ScheduleApi.postScheduleApi(payload.Schedule);
      payload.dispatch(__getSchedule(payload.userId));
      if (data.status === 201) {
      }
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editSchedule = createAsyncThunk(
  "schedule/editSchedule",
  async (payload) => {
    console.log("수정넘기기", payload);
    const data = await ScheduleApi.editScheduleApi(payload);
    payload.dispatch(__getSchedule(payload.userId));
    return data.data;
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
    scheduleReset: (state) => {
      state.oldschedules = [];
    },
  },
  extraReducers: {
    [__getSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedules = action.payload;
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
      console.log("slice getScrollpage", action.payload);
      console.log("fullfiled action", action.payload);
      state.schedules = [...state.schedules, ...action.payload];
    },
    [__getScrollPage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getPastSchedlue.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPastSchedlue.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.pastSchedules = action.payload;
    },

    [__getPastSchedlue.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getScheduleDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getScheduleDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.oldschedules = action.payload;
      console.log("올드스케줄", action.payload);
    },
    [__getScheduleDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { pagePlus, scheduleReset } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
