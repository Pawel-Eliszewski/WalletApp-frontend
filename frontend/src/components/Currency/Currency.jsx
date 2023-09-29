import { useEffect, useState } from "react";
import { fetchCurrency } from "../../utils/currencyExchange";
import s from "./Currency.module.css";

export function Currency() {
  const [currency, setCurrency] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchCurrency("EUR");
      setCurrency(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={s.currency_sidebar}>
      <table className={s.currency_table}>
        <thead className={s.currency_head}>
          <tr className={s.currency_head_row}>
            <th className={s.currency_header}>Currency</th>
            <th className={s.currency_header}>Purchase</th>
            <th className={s.currency_header}>Sale</th>
          </tr>
        </thead>
        <tbody className={s.currency_body}>
          {currency.map((element) => (
            <tr key={element.ccy}>
              <td className={s.currency_name}>{element.ccy}</td>
              <td className={s.currency_item}>
                {Math.floor(element.buy * 100) / 100}
              </td>
              <td className={s.currency_item}>
                {Math.floor(element.sale * 100) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.currency_bg}></div>
    </div>
  );
}
