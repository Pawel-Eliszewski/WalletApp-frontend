import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { selectIsModalEditTransactionOpen } from "../../redux/global/selectors";
import { setIsModalEditTransactionOpen } from "../../redux/global/globalSlice";
import { updateTransaction } from "../../redux/finance/operations";
import { Header } from "../Header/Header";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Calendar } from "../ModalAddTransaction/Calendar/Calendar";
import { Show } from "@chakra-ui/react";
import css from "./ModalEditTransaction.module.css";

export const ModalEditTransaction = () => {
  const dispatch = useDispatch();

  const isModalEditTransactionOpen = useSelector(
    selectIsModalEditTransactionOpen
  );

  // roboczo, bo nie ma propsów
  let transactionDetails = {
    type: "expense",
    category: "Car",
    amount: "5000",
    date: "20.09.2023",
    comment: "test",
  };

  const { type, category, amount, date, comment } = transactionDetails;

  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedDate, setUpdatedDate] = useState(date);

  const user = useSelector(selectUser);

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
    dispatch(
      updateTransaction({
        type: type,
        category: updatedCategory || "income",
        amount: updatedAmount,
        date: updatedDate,
        comment: updatedComment,
        owner: user._id,
      })
    );
    dispatch(setIsModalEditTransactionOpen(false));
  };

  const handleModalClose = () => {
    dispatch(setIsModalEditTransactionOpen(false));
    document.body.style.overflow = "unset";
  };

  const handleBackdropClick = () => {
    dispatch(setIsModalEditTransactionOpen(false));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleBackdropClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const incomeClass = type === "income" ? css.income : "";
  const expenseClass = type === "expense" ? css.expense : "";

  const backdropClass = isModalEditTransactionOpen
    ? css.backdropIsOpen
    : css.backdrop;

  return (
    <div className={backdropClass}>
      <div className={css.container}>
        <Show breakpoint="(max-width: 767px)">
          <Header userName={user.email} />
        </Show>
        <h2 className={css.title}>Edit transaction</h2>
        <div className={css.switchContainer}>
          <p className={incomeClass}>Income</p>
          <p className={css.slash}>/</p>
          <p className={expenseClass}>Expense</p>
        </div>
        <form className={css.form} onSubmit={handleSubmit}>
          {type === "expense" ? (
            <DropdownMenu
              category={updatedCategory}
              onClick={handleUpdatedCategory}
            />
          ) : null}
          <div className={css.formInnerBox}>
            <input
              name="Amount"
              className={css.money}
              placeholder={amount}
              required
            ></input>
            <Calendar date={updatedDate} onChange={handleUpdatedDate} />
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
