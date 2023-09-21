import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "#";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchAllTransactions",
  async (userId, thunkAPI) => {
    try {
      const responce = await axios.get(`/users/${userId}/transactions`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (data, thunkAPI) => {
    try {
      const responce = await axios.post(
        `/users/${data.userId}/transactions`,
        data.transaction
      );
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/users/${data.userId}/transactions/${data.transactionId}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  "finance/fetchBalance",
  async (userId, thunkAPI) => {
    try {
      const responce = await axios.get(`/users/${userId}/balance`);
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
