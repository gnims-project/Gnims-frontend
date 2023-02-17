import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ScheduleAPI } from "../../api/Schedule";
const initialState = [
  {
    id: 0,
    cardColor: "",
    date: null,
    time: null,
    subject: "",
    content: "",
    participantsId: null,
    isLoading: false,
  },
];
export const __AddSchedule = createAsyncThunk(
  "schedule/postSchedules",
  async (payload, thunkAPI) => {
    try {
      const data = await ScheduleAPI.scheduleAdd(payload);
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
    [__AddSchedule.pending]: (state) => {
      state.isLoading = true;
    },
    [__AddSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedules = [...state.schedules, action.payload];
    },
    [__AddSchedule.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ScheduleSlice.reducer;
