import { useSelector } from "react-redux";
import { selectBalance } from "../../redux/finance/selectors";
import styles from "./Balance.module.css";

export function Balance() {
  const balance = useSelector(selectBalance);

  return (
    <div className={styles.balance}>
      <div className={styles.balance__text}>Your balance</div>
      <div className={styles.balance__amount}>
        <span className={styles.balance__currency}></span>
        {balance} PLN
      </div>
    </div>
  );
}
