export const selectIsLoading = (state) => state.global.isLoading;

export const selectIsModalLogoutOpen = (state) =>
  state.global.isModalLogoutOpen;

export const selectIsModalAddTransactionOpen = (state) =>
  state.global.isModalAddTransactionOpen;

export const selectIsModalEditTransactionOpen = (state) =>
  state.global.isModalEditTransactionOpen;

export const selectTransactionId = (state) => state.global.transactionId;
