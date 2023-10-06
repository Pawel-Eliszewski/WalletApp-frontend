import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectUser } from "../../redux/session/selectors";
import { selectTransactions } from "../../redux/finance/selectors";
import { fetchTransactions } from "../../redux/finance/operations";
import { Doughnut } from "react-chartjs-2";
import { DropdownSelectYear } from "../DropdownSelect/DropdownSelect";
import { DropdownSelectMonth } from "../DropdownSelect/DropdownSelect";
import { assignColorsToTransactions } from "../../utils/assignColorsToTransactions";
import "chart.js/auto";
import styles from "./DiagramTab.module.css";

export function DiagramTab() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);

  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const [transactionColors, setTransactionColors] = useState({});
  const [coloredTransactions, setColoredTransactions] = useState([]);
  const [expenseSum, setExpenseSum] = useState(0);
  const [incomeSum, setIncomeSum] = useState(0);
  const [difference, setDifference] = useState(0);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    dispatch(fetchTransactions(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type !== "income"
    );

    const expenseTransactionsOfYear =
      selectedYear !== "Year"
        ? expenseTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : transactions.filter((transaction) => transaction.type !== "income");

    let month;

    if (selectedMonth) {
      switch (selectedMonth) {
        case "January":
          month = "01";
          break;
        case "February":
          month = "02";
          break;
        case "March":
          month = "03";
          break;
        case "April":
          month = "04";
          break;
        case "May":
          month = "05";
          break;
        case "June":
          month = "06";
          break;
        case "July":
          month = "07";
          break;
        case "August":
          month = "08";
          break;
        case "September":
          month = "09";
          break;
        case "October":
          month = "10";
          break;
        case "November":
          month = "11";
          break;
        case "December":
          month = "12";
          break;
        default:
          break;
      }
    }

    const expenseTransactionsOfMonth =
      selectedMonth !== "Month"
        ? expenseTransactionsOfYear.filter(
            (transaction) => transaction.date.slice(3, 5) === month
          )
        : transactions.filter((transaction) => transaction.type !== "income");
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income"
    );

    const incomeTransactionsOfYear =
      selectedYear !== "Year"
        ? incomeTransactions.filter(
            (transaction) => transaction.date.slice(6, 10) === selectedYear
          )
        : transactions.filter((transaction) => transaction.type === "income");

    const incomeTransactionsOfMonth =
      selectedMonth !== "Month"
        ? incomeTransactionsOfYear.filter(
            (transaction) => transaction.date.slice(3, 5) === month
          )
        : transactions.filter((transaction) => transaction.type === "income");

    setExpenseSum(
      expenseTransactionsOfMonth.reduce((sum, transaction) => {
        if (transaction.type === "expense") {
          sum += transaction.amount;
        }
        return sum;
      }, 0)
    );

    setIncomeSum(
      incomeTransactionsOfMonth.reduce((sum, transaction) => {
        if (transaction.type === "income") {
          sum += transaction.amount;
        }
        return sum;
      }, 0)
    );

    setDifference(incomeSum - expenseSum);

    const colors = assignColorsToTransactions(expenseTransactionsOfMonth);
    setTransactionColors(colors);

    const expenseTransactionsAll = expenseTransactionsOfMonth.map(
      (transaction) => ({
        ...transaction,
        color: colors[transaction.category] || "#000000",
      })
    );

    const categorySum = {};
    expenseTransactionsAll.forEach((transaction) => {
      const { _id, category, amount } = transaction;

      if (categorySum[category]) {
        categorySum[category].amount += amount;
      } else {
        categorySum[category] = { ...transaction };
      }
    });
    const summedExpenseTransactions = Object.values(categorySum);
    setColoredTransactions(summedExpenseTransactions);
  }, [transactions, selectedYear, selectedMonth, expenseSum, incomeSum]);

  useEffect(() => {}, [coloredTransactions]);

  const expensesCategories = coloredTransactions.reduce(
    (categories, transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) +
        parseFloat(transaction.amount);
      return categories;
    },
    {}
  );

  const expensesLabels = Object.keys(expensesCategories);
  const expensesData = Object.values(expensesCategories);

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  console.log(expensesLabels);

  return (
    <div className={styles.container}>
      <div className={styles.chart__container}>
        <h2 className={styles.statistics__header}>Statistics</h2>

        <div className={styles.doughnut}>
          <span className={styles.diagram__balance}>
            {difference.toFixed(2)} PLN
          </span>
          <Doughnut
            data={{
              labels: expensesLabels.length > 0 ? expensesLabels : ["Income"],
              datasets: [
                {
                  data: expensesData.length > 0 ? expensesData : [incomeSum],
                  backgroundColor: expensesLabels.map(
                    (category) => transactionColors[category]
                  ),
                },
              ],
            }}
            options={chartOptions}
          />
        </div>
      </div>
      <div className={styles.tablet__container}>
        <div className={styles.selectContainer}>
          <label className={styles.select__month}>
            <DropdownSelectMonth
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onSelect={handleMonthSelect}
            />
          </label>
          <label className={styles.select__year}>
            <DropdownSelectYear
              selectedYear={selectedYear}
              onSelect={handleYearSelect}
            />
          </label>
        </div>

        <ul className={styles.listNames}>
          <li className={styles.nameElement}>Category</li>
          <li className={styles.nameElement}>Amount</li>
        </ul>

        <ul className={styles.listTransaction}>
          {coloredTransactions?.length > 0 ? (
            coloredTransactions.map(({ _id, category, amount, color }) => (
              <li key={_id} className={styles.elementTransaction}>
                <div
                  className={styles.icon}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                ></div>
                <div className={styles.category}>{category}</div>
                <div className={styles.amount}>{amount.toFixed(2)} PLN</div>
              </li>
            ))
          ) : (
            <li className={styles.elementTransaction}>
              <div className={styles.category}>
                <p>No expense transactions found</p>
              </div>
            </li>
          )}
        </ul>

        <ul className={styles.listAll}>
          <li className={styles.elementListAll}>
            <div className={styles.elementAllText}>Expenses:</div>
            <div className={styles.elementAllExpenses}>
              {expenseSum.toFixed(2)} PLN
            </div>
          </li>
          <li className={styles.elementListAll}>
            <div className={styles.elementAllText}>Income:</div>
            <div className={styles.elementAllIncome}>
              {incomeSum.toFixed(2)} PLN
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
