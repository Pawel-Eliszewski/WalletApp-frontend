export const selectTransactions = (state) => state.finance.data;

export const selectTransactionsMonths = (state) => {
  const transactions = selectTransactions(state);

  let monthsAsNumbers = [];

  transactions.map((transaction) => {
    const month = transaction.date.slice(3, 5);
    if (!monthsAsNumbers.includes(month)) {
      monthsAsNumbers.push(month);
    }
  });

  monthsAsNumbers.sort();

  let months = [];

  monthsAsNumbers.map((month) => {
    switch (month) {
      case "01":
        months.push("January");
        break;
      case "02":
        months.push("February");
        break;
      case "03":
        months.push("March");
        break;
      case "04":
        months.push("April");
        break;
      case "05":
        months.push("May");
        break;
      case "06":
        months.push("June");
        break;
      case "07":
        months.push("July");
        break;
      case "08":
        months.push("August");
        break;
      case "09":
        months.push("September");
        break;
      case "10":
        months.push("October");
        break;
      case "11":
        months.push("November");
        break;
      case "12":
        months.push("December");
        break;
      default:
        break;
    }
  });

  return months;
};

export const selectTransactionsYears = (state) => {
  const transactions = selectTransactions(state);

  let years = [];

  transactions.map((transaction) => {
    const year = transaction.date.slice(6, 10);
    if (!years.includes(year)) {
      years.push(year);
    }
  });

  years.sort();

  return years;
};

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
