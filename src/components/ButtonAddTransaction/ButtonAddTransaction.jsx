import { useDispatch } from "react-redux";
import { setIsModalAddTransactionOpen } from "../../redux/global/globalSlice";
import css from "./ButtonAddTransaction.module.css";

export const ButtonAddTransaction = () => {
  const dispatch = useDispatch();

  const openModalAddTransaction = () => {
    dispatch(setIsModalAddTransactionOpen(true));
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <button className={css.btn} onClick={openModalAddTransaction}>
        <img className={css.icon} src={"/assets/icon-btn-income.png"}></img>
      </button>
    </>
  );
};
