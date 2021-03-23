import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  successMessage: null,
};

export const fetchPasswordResetEmailInfo = createAsyncThunk(
  "passwordResetEmail/fetchPasswordResetInfo",
  async (passwordResetEmail, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/account/forgot", passwordResetEmail);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const passwordResetEmailSlice = createSlice({
  name: "passwordResetEmail",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPasswordResetEmailInfo.fulfilled]: (state, action) => {
      state.successMessage = action.payload;
      state.error = null;
    },
    [fetchPasswordResetEmailInfo.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.successMessage = null;
    },
  },
});

export default passwordResetEmailSlice.reducer;
