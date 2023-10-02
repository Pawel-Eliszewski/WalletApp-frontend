import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { DropdownSelectY } from "../DropdownSelect/DropdownSelect";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import "chart.js/auto";

import styles from "./DiagramTab.module.css";
import { fakeTransactions } from "../../utils/fakeData";

export function DiagramTab() {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("Year");

  let filteredTransactions = fakeTransactions;

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

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
        <div className={styles.diagram__expenses}>
          ${expensesSum.toFixed(2)}
        </div>
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
      <div className={styles.tablet__container}>
        <div className={styles.selectContainer}>
          <label className={styles.select__month}>
            <DropdownSelect
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
          <li className={styles.nameElement}>Sum</li>
        </ul>

        <ul className={styles.listTransaction}>
          {filteredTransactions?.length > 0 ? (
            filteredTransactions.map(({ _id, category, sum, color }) => (
              <li key={_id} className={styles.elementTransaction}>
                <div
                  className={styles.icon}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                ></div>
                <div className={styles.category}>{category}</div>
                <div className={styles.sum}>{sum}</div>
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
            <div className={styles.elementAllIncome}>
              {incomeSum.toFixed(2)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
