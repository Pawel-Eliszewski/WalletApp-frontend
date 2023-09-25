
const getAllTransactions = (state) => state.transactions.result;

const getAllCategoriesFromTransactions = (state) =>
  state.transactions.categories;

const transactionSelectors = {
  getAllTransactions,
  getAllCategoriesFromTransactions,
};

export default transactionSelectors;
