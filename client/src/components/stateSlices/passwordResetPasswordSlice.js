import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  successMount: null,
  successSubmit: null,
  errorMount: null,
  updatedUser: null,
  errorSubmit: null,
};

export const fetchPasswordResetMount = createAsyncThunk(
  "passwordReset/fetchPasswordResetMount",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/account/reset/${token}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const fetchPasswordResetSubmit = createAsyncThunk(
  "passwordResetPassword/fetchPasswordResetInfo",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/account/reset/${token}`, {
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPasswordResetMount.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.successMount = true;
    },
    [fetchPasswordResetMount.rejected]: (state, action) => {
      state.errorMount = action.payload.message;
    },
    [fetchPasswordResetSubmit.fulfilled]: (state, action) => {
      state.updatedUser = action.payload;
      state.successSubmit = true;
    },
    [fetchPasswordResetSubmit.rejected]: (state, action) => {
      state.errorSubmit = action.payload.message;
    },
  },
});

export default passwordResetSlice.reducer;
