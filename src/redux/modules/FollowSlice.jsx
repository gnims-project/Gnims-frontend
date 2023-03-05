import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../shared/AxiosInstance";

const initialState = {
  following: {
    followingCount: "",
    followingList: [],
  },
  follower: {
    followerCount: "",
    followerList: [],
  },
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
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
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
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);
//팔로우 상태 변경하기
export const __postFollowState = createAsyncThunk(
  "getFollowState",
  async (payload, thunkAPI) => {
    console.log("팔로우 스테이트", payload.state);
    try {
      const data = await instance.post(`/friendship/followings/${payload.id}`);
      if (payload.state === "follower") {
        return thunkAPI.dispatch(__getFollower());
      } else return thunkAPI.dispatch(__getFollowing());
    } catch (error) {
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);
//팔로잉 카운트 가져오기
export const __getFollowingCount = createAsyncThunk(
  "getFollowingCount",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/friendship/followings/counting`);
      // console.log("팔로잉 카운트", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);
//팔로워 카운트 가져오기
export const __getFollowerCount = createAsyncThunk(
  "getFollowerCount",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/friendship/followers/counting`);
      // console.log("팔로워 카운트", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
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
      console.log("followerList");
      state.isLoading = false;
      state.follower.followerList = action.payload.data;
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
      console.log("followingList");
      state.isLoading = false;
      state.following.followingList = action.payload.data;
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
      console.log(action.payload);
    },
    [__postFollowState.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //팔로잉 카운터 가져오기
    [__getFollowingCount.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowingCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.following.followingCount = action.payload;
    },
    [__getFollowingCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //팔로워 카운터 가져오기
    [__getFollowerCount.pending]: (state) => {
      state.isLoading = true;
    },
    [__getFollowerCount.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.follower.followerCount = action.payload;
    },
    [__getFollowerCount.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = followSlice.actions;
export default followSlice.reducer;
