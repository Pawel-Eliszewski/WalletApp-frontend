import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { selectIsModalAddTransactionOpen } from "../../redux/global/selectors";
import { setIsModalAddTransactionOpen } from "../../redux/global/globalSlice";
import { addTransaction } from "../../redux/finance/operations";
import { Calendar } from "./Calendar/Calendar";
import { CustomizedMuiSwitch } from "./CustomizedMuiSwitch/CustomizedMuiSwitch";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Notify } from "notiflix";
import css from "./ModalAddTransaction.module.css";

export const ModalAddTransaction = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const isModalAddTransactionOpen = useSelector(
    selectIsModalAddTransactionOpen
  );

  const user = useSelector(selectUser);

  const today = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [date, setDate] = useState(today.toLocaleDateString("pl-PL", options));
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Select a category");

  const handleNewDate = (newDate) => {
    setDate(newDate.format("DD.MM.YYYY"));
  };

  const handleType = () => {
    type === "expense" ? setType("income") : setType("expense");
  };

  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.elements.amount.value;
    const cleanedAmount = amount.replace(/\s/g, "").replace(",", ".");
    const numberAmount = parseFloat(cleanedAmount);
    const comment = form.elements.comment.value;

    if (type === "expense" && category === "Select a category") {
      Notify.info("Please select a category before submitting.");
      return;
    } else if (amount === "" || undefined) {
      Notify.info("Please provide the correct amount.");
      return;
    }
    dispatch(
      addTransaction({
        type: type,
        category: type === "income" ? "Income" : category,
        amount: numberAmount,
        date: date,
        comment: comment,
        owner: user.id,
      })
    );
    document.body.style.overflow = "unset";
    Notify.success("Transaction added successfully.");
    form.reset();
    dispatch(setIsModalAddTransactionOpen(false));
  };

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    const form = document.getElementById("form");
    form.reset();
    dispatch(setIsModalAddTransactionOpen(false));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalAddTransactionOpen(false));
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      document.body.style.overflow = "unset";
      dispatch(setIsModalAddTransactionOpen(false));
    }
  };

  const incomeClass = type === "income" ? css.income : "";
  const expenseClass = type === "expense" ? css.expense : "";

  const backdropClass = isModalAddTransactionOpen
    ? css.backdropIsOpen
    : css.backdrop;

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className={css.container} ref={modalRef}>
        <h2 className={css.title}>Add transaction</h2>
        <div className={css.switchContainer}>
          <p className={incomeClass}>Income</p>
          <CustomizedMuiSwitch onChange={handleType} />
          <p className={expenseClass}>Expense</p>
        </div>
        <form id="form" className={css.form} onSubmit={handleSubmit}>
          {type === "expense" ? (
            <DropdownMenu category={category} onClick={handleCategory} />
          ) : null}
          <div className={css.formInnerBox}>
            <input
              name="amount"
              type="text"
              pattern="[0-9]+([,\\.][0-9]+)?"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9,\\.]/g, "");
              }}
              className={css.money}
              placeholder="0.00"
            ></input>
            <Calendar date={date} onChange={handleNewDate} />
          </div>
          <textarea
            name="comment"
            className={css.comment}
            placeholder="Comment"
          ></textarea>
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
