export const selectTransactions = (state) => state.finance.data;

export const selectTransactionsCategories = (state) => {
  const transactions = selectTransactions(state);

  let categories = [];

  transactions.forEach((transaction) => categories.push(transaction.category));

  return categories;
};

export const selectBalance = (state) => state.finance.totalBalance;
