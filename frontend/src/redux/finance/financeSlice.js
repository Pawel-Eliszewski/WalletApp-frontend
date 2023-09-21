import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchBalance,
} from "./operations";

const initialState = {
  totalBalance: 0,
  transactions: [],
  error: null,
  data: {},
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
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.error = null;
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        state.transactions.splice(index, 1);
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.error = null;
        state.totalBalance = action.payload;
      })
      .addCase(fetchBalance.rejected, handleRejected);
  },
});

export const financeReduser = financeSlice.reducer;
