import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  sortList: "D-Day",
  participantsId: null,
  isLoading: false,
};
export const __deleteSchedule = createAsyncThunk(
  "schedule/delete",
  async ({ id, userId, dispatch }) => {
    const response = await ScheduleApi.deleteScheduleApi(id);
    dispatch(__getSchedule({ userId: userId, sortedBy: "event.dDay" }));
    return response.data;
  }
);

export const __getSchedule = createAsyncThunk(
  "schedule/getSchedules",
  async (payload, thunkAPI) => {
    try {
      const { data } = await ScheduleApi.getSccheduleApi(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error);
    }
  }
);

export const __getScheduleDetail = createAsyncThunk(
  "schedule/getScheduleDetail",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/events/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error);
    }
  }
);

export const __getScrollPage = createAsyncThunk(
  "schedule/getScrollPage",
  async (payload, thunkAPI) => {
    try {
      const data = await ScheduleApi.getInfiniteScrollPage(payload);
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
      // console.log(error);
    }
  }
);

export const __postSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      const data = await ScheduleApi.postScheduleApi(payload.Schedule);

      if (data.status === 201) {
        payload.dispatch(setSortList("새로 등록된 일정"));
        payload.dispatch(
          __getSchedule({ userId: payload.userId, sortedBy: "event.createAt" })
        );
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
    const data = await ScheduleApi.editScheduleApi(payload);
    payload.dispatch(
      __getSchedule({ userId: payload.userId, sortedBy: "event.createAt" })
    );
    return data.data;
  }
);

export const __getPastSchedlue = createAsyncThunk(
  "schedule/getPastSchedlue",
  async (payload, thunkAPI) => {
    try {
      const { data } = await ScheduleApi.getPastScheduleApi();
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
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
    mainScheduleReset: (state) => {
      state.schedules = [];
    },
    setSortList: (state, action) => {
      state.sortList = action.payload;
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
    },
    [__getScheduleDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { pagePlus, scheduleReset, mainScheduleReset, setSortList } =
  ScheduleSlice.actions;
export default ScheduleSlice.reducer;
