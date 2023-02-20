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
//초대 스케줄 가져오기
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
//초대 스케줄 거절
export const refuseInvitation = (payload) => {
  return async function (dispatch) {
    await instance
      .post(`/events/${payload}/rejection`)
      .then((res) => {
        console.log("거절후", res);
        dispatch(__getInvitation());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
//초대 스케줄 수락
export const acceptInvitation = (payload) => {
  return async function (dispatch) {
    await instance
      .post(`/events/${payload}/acceptance`)
      .then((res) => {
        console.log("수락후", res);
        dispatch(__getInvitation());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    // isLogin: (state, action) => {
    //   console.log(action.payload);
    //   state.isLogin = action.payload;
    // },
    // infoList: (state, action) => {
    //   state.infoList = action.payload;
    // },
    // gethistorys: (state, action) => {
    //   state.historyList = action.payload;
    // },
  },
  extraReducers: {
    [__getInvitation.pending]: (state) => {
      state.isLoading = true;
    },
    [__getInvitation.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      console.log(state.datas);
    },
    [__getInvitation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = invitationSlice.actions;
export default invitationSlice.reducer;