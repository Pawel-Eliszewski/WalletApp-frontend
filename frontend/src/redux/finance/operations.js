import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../session/operations";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (userId, thunkAPI) => {
    try {
      const response = await instance.get(
        `/user/${userId}/transactions?userId=${userId}`
      );
      console.log(response);
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
      const response = await instance.delete(`/${transactionID}`);
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
      const response = await instance.patch("/transaction", data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
