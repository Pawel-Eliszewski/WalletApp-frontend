import { useSelector } from "react-redux";
import { selectTransactions } from "../redux/finance/selectors";

export const getMonthsForYear = (year) => {
  const transactions = useSelector(selectTransactions);

  let monthsAsNumbers = [];

  transactions.map((transaction) => {
    const yearOfTransaction = transaction.date.slice(6, 10);
    if (yearOfTransaction === year) {
      const month = transaction.date.slice(3, 5);
      if (!monthsAsNumbers.includes(month)) {
        monthsAsNumbers.push(month);
      }
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
