import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "#";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/user/${userId}/transactions`);
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
      const response = await axios.post("/transaction", data);
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
      const response = await axios.delete(`/${transactionID}`);
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
      const response = await axios.patch("/transaction", data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
