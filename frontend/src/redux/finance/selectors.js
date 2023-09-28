export const selectTransactions = (state) => state.finance.data;

export const selectTransactionsCategories = (state) => {
  const transactions = selectTransactions(state);

  let categories = [];

  transactions.forEach((transaction) => categories.push(transaction.category));

  return categories;
};

export const selectTransactionsCategoriesSummary = (state) => {
  const transactions = selectTransactions(state);

  let categoriesSumary = {
    consumption: 0,
    income: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.category === "income") {
      categoriesSumary.income + transaction.amount;
    } else {
      categoriesSumary.consumption + transaction.amount;
    }
  });

  return categoriesSumary;
};

export const selectBalance = (state) => state.finance.totalBalance;
