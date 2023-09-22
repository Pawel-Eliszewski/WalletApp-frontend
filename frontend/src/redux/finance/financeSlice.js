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
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction.id === action.payload.id
        );
        state.data.splice(index, 1);
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.error = null;
        state.totalBalance = action.payload;
      })
      .addCase(fetchBalance.rejected, handleRejected);
  },
});

export const financeReducer = financeSlice.reducer;
