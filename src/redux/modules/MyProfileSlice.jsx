import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//전역으로 관리할 프로필 스테이트
const initialState = {
  nickname: "",
  username: "",
  email: "",
  profile_image: null,
  followCount: "",
  followerCount: "",
  isLoading: false,
  error: null,
};

//프로필 정보를 가져오는 성크함수
export const __getMyProfile = createAsyncThunk(
  "getMyProfile",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const data = await axios.get(config);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.errorMessage);
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const myprofileSlice = createSlice({
  name: "myprofile",
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
