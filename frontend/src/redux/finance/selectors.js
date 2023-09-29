export const selectTransactions = (state) => state.finance.data;

export const selectTransactionsCategories = (state) => {
  const transactions = selectTransactions(state);

  let categories = [];

  transactions.forEach((transaction) => categories.push(transaction.category));

  return categories;
};

export const selectTransactionsCategoriesSummary = (state) => {
  const transactions = selectTransactions(state);

  let categoriesSummary = {
    expense: 0,
    income: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      categoriesSummary.income + transaction.amount;
    } else {
      categoriesSummary.expense + transaction.amount;
    }
  });

  return categoriesSummary;
};

export const selectBalance = (state) => state.finance.totalBalance;
