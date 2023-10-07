import { Notify } from "notiflix";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../session/operations";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (userId, thunkAPI) => {
    try {
      const response = await instance.get(
        `/user/${userId}/transactions?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await instance.post("/transaction", data);
      Notify.success("Transaction added successfully.");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (transactionID, thunkAPI) => {
    try {
      const response = await instance.delete(`/transaction/${transactionID}`);
      Notify.success("Transaction deleted successfully.");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "finance/updateTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/transaction/${data.transactionId}`,
        data
      );
      Notify.success("Transaction updated successfully.");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
