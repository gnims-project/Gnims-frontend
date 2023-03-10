import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";

const initialState = {
  invitation: [],
  isLoading: false,
  error: null,
};

//초대 스케줄 가져오기
export const __getInvitation = createAsyncThunk(
  "getInvitation",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`v2/events/pending`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
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
        dispatch(__getInvitation());
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

//초대 스케줄 수락
export const acceptInvitation = (payload) => {
  return async function (dispatch) {
    await instance
      .post(`/events/${payload}/acceptance`)
      .then((res) => {
        dispatch(__getInvitation());
      })
      .catch((error) => {
        // console.log(error);
      });
  };
};

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
      state.invitation = action.payload;
    },
    [__getInvitation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = invitationSlice.actions;
export default invitationSlice.reducer;
