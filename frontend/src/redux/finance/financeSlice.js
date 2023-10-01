import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./operations";
import { register, login, logout, refreshUser } from "../session/operations";

const initialState = {
  totalBalance: 0,
  data: [],
  error: null,
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  toast.error(`${state.error}`);
};

const financeSlice = createSlice({
  name: "finance",

  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.error = null;
        state.data.push(action.payload.data);
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction.id === action.payload.data.id
        );
        state.data.splice(index, 1);
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction.id === action.payload.data.id
        );
        state.data.splice(index, 1, action.payload.data);
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.totalBalance = 0;
        state.data = [];
        state.error = null;
      });
  },
});

export const financeReducer = financeSlice.reducer;
