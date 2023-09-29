import { store } from "../redux/store";
import { selectTransactions } from "../redux/finance/selectors";

const paginateTransactions = (page) => {
  const state = store.getState();
  const transactions = selectTransactions(state);
  const length = transactions.length;
  const pages = Math.ceil(length / 9);

  let currentPage;
  if (!page) {
    currentPage = 1;
  } else if (page > pages) {
    currentPage = pages;
  } else {
    currentPage = page;
  }

  let start = (currentPage - 1) * 9;
  let end = currentPage * 9;

  const paginatedTransactions = transactions.slice(start, end);

  const paginationData = {
    pages,
    paginatedTransactions,
  };

  return paginationData;
};

export default paginateTransactions;
