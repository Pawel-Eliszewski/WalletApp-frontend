import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import styles from "./DiagramTab.module.css";
import { fakeTransactions } from "../../utils/fakeData";

export function DiagramTab() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  let filteredTransactions = fakeTransactions;

  if (selectedMonth !== "All") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.date.split(".")[1] === selectedMonth
    );
  }

  if (selectedYear !== "All") {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.date.split(".")[2] === selectedYear
    );
  }

  const expensesSum = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + parseFloat(transaction.sum), 0);

  const incomeSum = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + parseFloat(transaction.sum), 0);

  const expensesCategories = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((categories, transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) + parseFloat(transaction.sum);
      return categories;
    }, {});

  const expensesLabels = Object.keys(expensesCategories);
  const expensesData = Object.values(expensesCategories);
  const expensesColors = expensesLabels.map(
    (category) =>
      filteredTransactions.find((t) => t.category === category)?.color
  );

  const incomeCategories = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((categories, transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) + parseFloat(transaction.sum);
      return categories;
    }, {});

  const incomeLabels = Object.keys(incomeCategories);
  const incomeData = Object.values(incomeCategories);
  const incomeColors = incomeLabels.map(
    (category) =>
      filteredTransactions.find((t) => t.category === category)?.color
  );

  const chartOptions = {
    legend: {
      display: true,
      position: "right",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label>
          Select Month:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
          </select>
        </label>
        <label>
          Select Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </label>
      </div>

      <div className={styles.chartContainer}>
        <h2>Expenses Chart</h2>
        <Doughnut
          data={{
            labels: expensesLabels,
            datasets: [
              {
                data: expensesData,
                backgroundColor: expensesColors,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>

      <div className={styles.chartContainer}>
        <h2>Income Chart</h2>
        <Doughnut
          data={{
            labels: incomeLabels,
            datasets: [
              {
                data: incomeData,
                backgroundColor: incomeColors,
              },
            ],
          }}
          options={chartOptions}
        />
      </div>

      <ul className={styles.listNames}>
        <li className={styles.nameElement}>Category</li>
        <li className={styles.nameElement}>Sum</li>
      </ul>

      <ul className={styles.listTransaction}>
        {filteredTransactions?.length > 0 ? (
          filteredTransactions.map(({ _id, category, sum, type, color }) => (
            <li key={_id} className={styles.elementTransaction}>
              <div
                style={{
                  backgroundColor: `${color}`,
                  width: "24px",
                  minHeight: "24px",
                  borderRadius: "12px",
                  marginRight: "15px",
                }}
              ></div>
              <div className={styles.category}>{category}</div>
              <div className={styles.sum}>{sum}</div>
              <div className={styles.type}>{type}</div>
            </li>
          ))
        ) : (
          <li className={styles.elementTransaction}>
            <div className={styles.category}>
              <p>Here is nothing :(</p>
            </div>
          </li>
        )}
      </ul>

      <ul className={styles.listAll}>
        <li className={styles.elementListAll}>
          <div className={styles.elementAllText}>Expenses:</div>
          <div className={styles.elementAllExpenses}>
            {expensesSum.toFixed(2)}
          </div>
        </li>
        <li className={styles.elementListAll}>
          <div className={styles.elementAllText}>Income:</div>
          <div className={styles.elementAllIncome}>{incomeSum.toFixed(2)}</div>
        </li>
      </ul>
    </div>
  );
}
