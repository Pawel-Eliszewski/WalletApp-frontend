import PropTypes from "prop-types";
import { Header } from "../Header/Header";
import { Calendar } from "./Calendar/Calendar";
import { useState } from "react";
import { CustomizedMuiSwitch } from "./CustomizedMuiSwitch/CustomizedMuiSwitch";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Show } from "@chakra-ui/react";
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
  const backdropClass = isModalAddTransactionOpen
    ? css.backdropIsOpen
    : css.backdrop;

  // jeśli category !== "null" odpal onSubmit

  return (
    <div className={backdropClass}>
      <div className={css.container}>
        <Show breakpoint="(max-width: 767px)">
          <Header userName={userName} />
        </Show>
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
          <div className={css.formInnerBox}>
            <input className={css.money} placeholder="0.00" required></input>
            <Calendar date={date} onChange={handleNewDate} />
          </div>
          <textarea className={css.comment} placeholder="Comment"></textarea>
          <button type="submit" className={css.btnGreen}>
            ADD
          </button>
        </form>
        <button onClick={handleModalClose} className={css.btnCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

ModalAddTransaction.propTypes = {
  userName: PropTypes.string.isRequired,
};
