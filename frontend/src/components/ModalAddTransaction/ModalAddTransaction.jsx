import { BasicDatePicker } from "../BasicDatePicker/BasicDatePicker";
import css from "./ModalAddTransaction.module.css";

export const ModalAddTransaction = (userName) => {
  userName = "Name";
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
      <div className={css.transactionTypeBox}>
        <p>Income</p>
        <button></button>
        <p>Expense</p>
      </div>
      <BasicDatePicker />
      <button className={css.btnGreen}>ADD</button>
      <button className={css.btnTransparent}>CANCEL</button>
    </div>
  );
};
