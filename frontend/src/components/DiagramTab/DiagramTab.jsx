import { useSelector, useDispatch } from "react-redux";
import { selectBalance } from "../../redux/finance/selectors";
import { useState, useEffect } from "react";
import { selectUser } from "../../redux/session/selectors";
import { selectTransactions } from "../../redux/finance/selectors";
import { fetchTransactions } from "../../redux/finance/operations";
import { assignColorsToTransactions } from "../../utils/assignColorsToTransactions";
import { Doughnut } from "react-chartjs-2";
import { DropdownSelectY } from "../DropdownSelect/DropdownSelect";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import {
  selectTransactionsMonths,
  selectTransactionsYears,
} from "../../redux/finance/selectors";
import styles from "./DiagramTab.module.css";
import "chart.js/auto";

export function DiagramTab() {
  const balance = useSelector(selectBalance);
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector(selectTransactions);
  const [transactionColors, setTransactionColors] = useState({});
  const [coloredTransactions, setColoredTransactions] = useState([]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // const transactions = selectTransactionsMonths();

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const expenseSum = transactions.reduce((sum, transaction) => {
    if (transaction.type === "expense") {
      sum += transaction.amount;
    }
    return sum;
  }, 0);

  const incomeSum = transactions.reduce((sum, transaction) => {
    if (transaction.type === "income") {
      sum += transaction.amount;
    }
    return sum;
  }, 0);

  useEffect(() => {
    dispatch(fetchTransactions(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type !== "income"
    );

    const colors = assignColorsToTransactions(expenseTransactions);
    setTransactionColors(colors);

    const expenseTransactionsAll = expenseTransactions.map((transaction) => ({
      ...transaction,
      color: colors[transaction.category] || "#000000",
    }));

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
  }, [transactions]);

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

  return (
    <div className={styles.container}>
      <div className={styles.chart__container}>
        <h2 className={styles.statistics__header}>Statistics</h2>

        <div className={styles.doughnut}>
          <span className={styles.diagram__expenses}>{balance} PLN</span>
          <Doughnut
            data={{
              labels: expensesLabels,
              datasets: [
                {
                  data: expensesData,
                  backgroundColor: expensesLabels.map(
                    (category) => transactionColors[category] || "#black"
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
            <DropdownSelect
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onSelect={handleMonthSelect}
            />
          </label>
          <label className={styles.select__year}>
            <DropdownSelectY
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
                <div className={styles.amount}>{amount} PLN</div>
              </li>
            ))
          ) : (
            <li className={styles.elementTransaction}>
              <div className={styles.category}>
                <p>No transactions found</p>
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
