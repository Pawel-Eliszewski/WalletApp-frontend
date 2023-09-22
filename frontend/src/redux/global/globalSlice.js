import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
};

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsModalLogoutOpen(state, action) {
      state.isModalLogoutOpen = action.payload;
    },
    setIsModalAddTransactionOpen(state, action) {
      state.isModalAddTransactionOpen = action.payload;
    },
    setIsModalEditTransactionOpen(state, action) {
      state.isModalEditTransactionOpen = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setIsModalLogoutOpen,
  setIsModalAddTransactionOpen,
  setIsModalEditTransactionOpen,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
