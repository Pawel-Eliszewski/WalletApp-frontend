import PropTypes from "prop-types";
import { Calendar } from "./Calendar/Calendar";
import { useState } from "react";
import { CustomizedMuiSwitch } from "./CustomizedMuiSwitch/CustomizedMuiSwitch";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import css from "./ModalAddTransaction.module.css";

export const ModalAddTransaction = ({ userName }) => {
  const today = new Date();
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(true);
  const [date, setDate] = useState(today.toLocaleDateString());
  const [isIncome, setIsIncome] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("Select a category");

  const handleNewDate = (newDate) => {
    setDate(newDate.format("DD.MM.YYYY"));
  };

  const handleIsIncome = () => {
    setIsIncome((current) => !current);
  };

  const handleExpenseCategory = (category) => {
    setExpenseCategory(category);
  };

  const handleModalClose = () => {
    setIsModalAddTransactionOpen(false);
  };

  const incomeClass = isIncome ? css.income : "";
  const expenseClass = !isIncome ? css.expense : "";

  userName = "Paweł";

  // jeśli category !== "null" odpal onSubmit

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.logoWrapper}>
          <img className={css.logo} src="/assets/icon-wallet.png"></img>
          <img className={css.appName} src="/assets/icon-wallet-text.png"></img>
        </div>
        <div className={css.nav}>
          <h3 className={css.userName}>{userName}</h3>
          <img className={css.iconExit} src="/assets/icon-exit-doors.png"></img>
        </div>
      </div>
      <h2 className={css.title}>Add transaction</h2>
      <div className={css.switchContainer}>
        <p className={incomeClass}>Income</p>
        <CustomizedMuiSwitch onChange={handleIsIncome} />
        <p className={expenseClass}>Expense</p>
      </div>
      <form className={css.form}>
        {!isIncome ? (
          <DropdownMenu
            expenseCategory={expenseCategory}
            onClick={handleExpenseCategory}
          />
        ) : null}
        <input className={css.money} placeholder="0.00" required></input>
        <Calendar date={date} onChange={handleNewDate} />
        <textarea className={css.comment} placeholder="Comment"></textarea>
        <button type="submit" className={css.btnGreen}>
          ADD
        </button>
      </form>
      <button onClick={handleModalClose} className={css.btnCancel}>
        CANCEL
      </button>
    </div>
  );
};

ModalAddTransaction.propTypes = {
  userName: PropTypes.string.isRequired,
};
