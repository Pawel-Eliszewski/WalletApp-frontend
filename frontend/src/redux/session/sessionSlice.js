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
        state.user = {
          email: action.payload.data.email,
          id: action.payload.data._id,
        };
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data.ID,
          email: action.payload.data.email,
        };
        state.token = action.payload.data.token;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state = initialState;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data._id,
          email: action.payload.data.email,
        };
        state.token = action.payload.data.token;
        state.isAuth = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;
