import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import meApi from "../../service/meService";
import { RootState } from "../../store";
import httpRequest from "../../utils/httpRequest";

const NAME = "me";

export interface Me {
  isLoading: boolean;
  userProfile: any;
  phoneBooks: Array<any>;
}

const initialState: Me = {
  isLoading: false,
  userProfile: {},
  phoneBooks: [],
};

export const getProfile = createAsyncThunk(`${NAME}/fetchProfile`, async () => {
  const res = await meApi.fetchProfile();
  return res.data;
});

const meSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///////

    builder.addCase(getProfile.pending, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });

    ////
  },
});

const meReducer = meSlice.reducer;

export const meSelector = (state: RootState) => state.meReducer;

export default meReducer;
