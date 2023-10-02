import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { selectIsModalEditTransactionOpen } from "../../redux/global/selectors";
import { selectTransactions } from "../../redux/finance/selectors";
import { setIsModalEditTransactionOpen } from "../../redux/global/globalSlice";
import { updateTransaction } from "../../redux/finance/operations";
import { Header } from "../Header/Header";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Calendar } from "../ModalAddTransaction/Calendar/Calendar";
import { Show } from "@chakra-ui/react";
import { Notify } from "notiflix";
import css from "./ModalEditTransaction.module.css";

export const ModalEditTransaction = ({ transactionId }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const allTransactions = useSelector(selectTransactions);

  const selectedTransaction = allTransactions.find(
    (transaction) => transaction._id === transactionId
  );

  const { _id, type, category, amount, date, comment } = selectedTransaction;

  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedDate, setUpdatedDate] = useState(date);

  const isModalEditTransactionOpen = useSelector(
    selectIsModalEditTransactionOpen
  );

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${month}.${day}.${year}`;
  }

  const handleUpdatedCategory = (category) => {
    setUpdatedCategory(category);
  };

  const handleUpdatedDate = (newDate) => {
    setUpdatedDate(newDate.format("DD.MM.YYYY"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAmount = form.elements.amount.value;
    const updatedComment = form.elements.comment.value;

    if (!updatedAmount || isNaN(updatedAmount)) {
      Notify.info("Please provide a valid amount.");
      return;
    }
    const numberUpdatedAmount = parseFloat(updatedAmount);

    dispatch(
      updateTransaction({
        id: _id,
        type: type,
        category: updatedCategory,
        amount: numberUpdatedAmount,
        date: updatedDate,
        comment: updatedComment || "",
        owner: user.id,
      })
    );

    Notify.success("Transaction updated successfully.");
    form.reset();
    dispatch(setIsModalEditTransactionOpen(false));
  };

  const handleModalClose = () => {
    const form = document.getElementById("form");
    form.reset();
    document.body.style.overflow = "unset";
    dispatch(setIsModalEditTransactionOpen(false));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalEditTransactionOpen(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(setIsModalEditTransactionOpen(false));
    }
  };

  const incomeClass = type === "income" ? css.income : "";
  const expenseClass = type === "expense" ? css.expense : "";

  const backdropClass = isModalEditTransactionOpen
    ? css.backdropIsOpen
    : css.backdrop;

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className={css.container} ref={modalRef}>
        <Show breakpoint="(max-width: 767px)">
          <Header userName={user.email} />
        </Show>
        <h2 className={css.title}>Edit transaction</h2>
        <div className={css.switchContainer}>
          <p className={incomeClass}>Income</p>
          <p className={css.slash}>/</p>
          <p className={expenseClass}>Expense</p>
        </div>
        <form id="form" className={css.form} onSubmit={handleSubmit}>
          {type === "expense" ? (
            <DropdownMenu category={category} onClick={handleUpdatedCategory} />
          ) : null}
          <div className={css.formInnerBox}>
            <input
              name="amount"
              type="number"
              className={css.money}
              placeholder={amount}
            ></input>
            <Calendar date={formatDate(date)} onChange={handleUpdatedDate} />
          </div>
          <textarea
            name="comment"
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
  transactionId: PropTypes.string,
};
