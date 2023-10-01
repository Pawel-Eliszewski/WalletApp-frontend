import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto";

import styles from "./DiagramTab.module.css";
import { fakeTransactions } from "../../utils/fakeData";

export function DiagramTab() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const options = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
  ];
  const optionsYear = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      width: "280px",
      height: "50px",
      backgroundColor: "transparent",
      borderRadius: "30px",
      border: "1px solid black",
      color: "black",
      cursor: "pointer",
      outline: "none",
      paddingLeft: "20px",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "24px",
      letterSpacing: "0em",
    }),
  };
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
      <div className={styles.chartContainer}>
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

      <div className={styles.selectContainer}>
        <label className={styles.select__month}>
          <Select
            styles={customStyles}
            options={options}
            value={options.find((option) => option.value === selectedMonth)}
            onChange={(selectedOption) =>
              setSelectedMonth(selectedOption.value)
            }
            placeholder="January"
            isSearchable={false}
          />
        </label>
        <label className={styles.select__year}>
          <Select
            styles={customStyles}
            options={optionsYear}
            value={optionsYear.find((option) => option.value === selectedYear)}
            onChange={(selectedOption) => setSelectedYear(selectedOption.value)}
            placeholder="2023"
            isSearchable={false}
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
          <div className={styles.elementAllIncome}>{incomeSum.toFixed(2)}</div>
        </li>
      </ul>
    </div>
  );
}
