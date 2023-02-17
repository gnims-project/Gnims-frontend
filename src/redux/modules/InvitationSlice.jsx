import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../shared/AxiosInstance";

const initialState = {
  data: [
    {
      eventId: null,
      date: "",
      time: "",
      cardColor: "",
      subject: "",
      invitees: [
        {
          username: "",
          profile: "",
        },
      ],
      dday: null,
    },
  ],
  isLoading: false,
  error: null,
};

export const __getInvitation = createAsyncThunk(
  "getInvitation",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/events/pending`);
      console.log("무슨데이터?", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("무슨에러?", error);
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {},
  extraReducers: {
    [__getInvitation.pending]: (state) => {
      state.isLoading = true;
    },
    [__getInvitation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getInvitation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = invitationSlice.actions;
export default invitationSlice.reducer;
