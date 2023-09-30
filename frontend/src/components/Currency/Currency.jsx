import { useEffect, useState } from "react";
import { fetchCurrency } from "../../utils/currencyExchange";
import { nanoid } from "nanoid";
import s from "./Currency.module.css";

export function Currency() {
  const [currencyData, setCurrencyData] = useState([]);

  const fetchData = async () => {
    try {
      const dataEUR = await fetchCurrency("EUR");
      const dataUSD = await fetchCurrency("USD");

      // Zamień currency na EUR dla danych z Euro
      const modifiedDataEUR = dataEUR.map((element) => ({
        ...element,
        currency: "EUR",
      }));

      // Zamień currency na USD dla danych z Dolara
      const modifiedDataUSD = dataUSD.map((element) => ({
        ...element,
        currency: "USD",
      }));

      setCurrencyData([...modifiedDataEUR, ...modifiedDataUSD]);
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
          <tr key={nanoid()} className={s.currency_head_row}>
            <th className={s.currency_header}>Currency</th>
            <th className={s.currency_header}>Purchase</th>
            <th className={s.currency_header}>Sale</th>
          </tr>
        </thead>
        <tbody className={s.currency_body}>
          {currencyData.map((element) => (
            <tr key={nanoid()}>
              <td className={s.currency_item}>{element.currency}</td>
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
