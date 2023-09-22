import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { register, login, logout, refreshUser } from "./operations";

const handleRejected = (state, action) => {
  state.error = action.payload;
  toast.error(`${state.error}`);
};

const initialState = {
  isAuth: false,
  isRefreshing: false,
  error: null,
  token: null,
  user: null,
};

const sessionSlice = createSlice({
  name: "session",

  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;
