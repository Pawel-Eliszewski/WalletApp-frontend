import PropTypes from "prop-types";
import { Header } from "../Header/Header";
import { Calendar } from "../ModalAddTransaction/Calendar/Calendar";
import { useState } from "react";
import { Show } from "@chakra-ui/react";
import css from "./ModalEditTransaction.module.css";

export const ModalEditTransaction = ({ userName, transactionDetails }) => {
  const [isModalEditTransactionOpen, setIsModalEditTransactionOpen] =
    useState(true);

  // TO DO jeśli category !== "null" odpal onSubmit

  // roboczo, bo nie ma propsów
  transactionDetails = {
    type: "expense",
    category: "Car",
    sum: 5000,
    date: "20.09.2023",
    comment: "test",
  };

  const { type, category, sum, date, comment } = transactionDetails;

  const handleModalClose = () => {
    setIsModalEditTransactionOpen(false);
  };

  const incomeClass = type === "income" ? css.income : "";
  const expenseClass = type === "expense" ? css.expense : "";
  const backdropClass = isModalEditTransactionOpen
    ? css.backdropIsOpen
    : css.backdrop;

  return (
    <div className={backdropClass}>
      <div className={css.container}>
        <Show breakpoint="(max-width: 767px)">
          <Header userName={userName} />
        </Show>
        <h2 className={css.title}>Edit transaction</h2>
        <div className={css.switchContainer}>
          <p className={incomeClass}>Income</p>
          <p className={css.slash}>/</p>
          <p className={expenseClass}>Expense</p>
        </div>
        <form className={css.form}>
          {/* {!isIncome ? (
            <DropdownMenu
              expenseCategory={expenseCategory}
              onClick={handleExpenseCategory}
            />
          ) : null} */}
          {type === "expense" ? (
            <input placeholder={category} className={css.category}></input>
          ) : null}
          <div className={css.formInnerBox}>
            <input
              name="Sum"
              className={css.money}
              placeholder={sum}
              required
            ></input>
            <Calendar date={date} />
          </div>
          <textarea
            name="Comment"
            className={css.comment}
            placeholder={comment}
          ></textarea>
          <button type="submit" className={css.btnGreen}>
            SAVE
          </button>
        </form>
        <button onClick={handleModalClose} className={css.btnCancel}>
          CANCEL
        </button>
      </div>
    </div>
  );
};

ModalEditTransaction.propTypes = {
  userName: PropTypes.string.isRequired,
};
