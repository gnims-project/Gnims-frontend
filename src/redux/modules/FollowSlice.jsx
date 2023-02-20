import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";

const initialState = {
  followingList: [],
  followerList: [],
  followState: [],
  isLoading: false,
  error: null,
};

//팔로워(나를 등록한 친구)를 가져오는 함수
export const __getFollower = createAsyncThunk(
  "getFollower",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/friendship/followers`);
      console.log("무슨데이터?", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("무슨에러?", error);
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

//팔로잉(내가 등록한 친구)를 가져오는 함수
export const __getFollowing = createAsyncThunk(
  "getFollowing",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/friendship/followings`);
      console.log("무슨데이터?", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("무슨에러?", error);
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);
//팔로우 상태 변경하기
export const __postFollowState = createAsyncThunk(
  "getFollowState",
  async (payload, thunkAPI) => {
    console.log("팔로우 상태", payload);
    try {
      const data = await instance.post(`/friendship/followings/${payload}`);
      console.log("무슨데이터?", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("무슨에러?", error);
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: {
    //팔로워 가져오기
    [__getFollower.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollower.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.followerList = action.payload.data;
      console.log("팔로워 잘 오냐", state.followerList);
    },
    [__getFollower.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //팔로잉 가져오기
    [__getFollowing.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowing.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.followingList = action.payload.data;
      console.log("팔로잉 잘 오냐", state.followingList);
    },
    [__getFollowing.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //팔로우 상태 가져오기
    [__postFollowState.pending]: (state) => {
      state.isLoading = true;
    },
    [__postFollowState.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.followState = action.payload;
      console.log("팔로우 상태가?", state.followState);
    },
    [__postFollowState.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = followSlice.actions;
export default followSlice.reducer;
