import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  user: null,
  error: null,
};

export const fetchLoginInfo = createAsyncThunk(
  "login/fetchLoginInfo",
  async (loginData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/users/login", loginData, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
    },
  },
  extraReducers: {
    [fetchLoginInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLoginInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [fetchLoginInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
