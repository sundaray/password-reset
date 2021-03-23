import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  user: null,
  error: null,
};

export const fetchRegisterInfo = createAsyncThunk(
  "register/fetchRegisterInfo",
  async (registerData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/users/register",
        registerData,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRegisterInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRegisterInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [fetchRegisterInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default registerSlice.reducer;
