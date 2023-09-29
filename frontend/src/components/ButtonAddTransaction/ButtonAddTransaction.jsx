import { useDispatch } from "react-redux";
import { setIsModalAddTransactionOpen } from "../../redux/global/globalSlice";
import css from "./ButtonAddTransaction.module.css";

export const ButtonAddTransaction = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setIsModalAddTransactionOpen(true));
  };
  return (
    <>
      <button className={css.btn} onClick={openModal}>
        <img className={css.icon} src={"/assets/icon-btn-income.png"}></img>
      </button>
    </>
  );
};
