import { store } from "../redux/store";
import { selectTransactions } from "../redux/finance/selectors";

export const paginateTransactions = (page) => {
  const state = store.getState();
  const transactions = selectTransactions(state);

  const length = transactions.length;
  const pages = Math.ceil(length / 7);

  let currentPage;
  if (!page) {
    currentPage = 1;
  } else if (page > pages) {
    currentPage = pages;
  } else {
    currentPage = page;
  }

  let start = (currentPage - 1) * 7;
  let end = currentPage * 7;

  const paginatedTransactions = transactions.slice(start, end);

  const paginationData = {
    pages,
    paginatedTransactions,
  };
  console.log(paginationData);
  return paginationData;
};
