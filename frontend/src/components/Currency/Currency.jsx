import { useEffect, useState } from "react";
import { fetchCurrency } from "../../utils/currencyExchange";
// import nanoid from "nanoid";
import s from "./Currency.module.css";

export function Currency() {
  const [currency, setCurrency] = useState([]);

  console.log(currency);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchCurrency("EUR");
        setCurrency(data);
      } catch (error) {
        console.error(error);
      }
    };

    const id = setInterval(() => {
      fetch();
    }, 300000);

    fetch();

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className={s.currency_sidebar}>
        <TableContainer className={s.currency_table_container}>
          <Table className={s.currency_table} size="small">
            <TableHead className={s.currency_head}>
              <TableRow className={s.currency_head_row}>
                <TableCell className={s.currency_header}>Currency</TableCell>
                <TableCell align="center" className={s.currency_header}>
                  Purchase
                </TableCell>
                <TableCell align="center" className={s.currency_header}>
                  Sale
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={s.currency_body}>
              {currency?.map((element) => (
                <TableRow key={element.ccy}>
                  <TableCell
                    key={element.nanoid()}
                    component="th"
                    scope="row"
                    align="left"
                    className={s.currency_name}
                  >
                    {element.ccy}
                  </TableCell>
                  <TableCell align="center" className={s.currency_item}>
                    {Math.floor(element.buy * 100) / 100}
                  </TableCell>
                  <TableCell align="center" className={s.currency_item}>
                    {Math.floor(element.sale * 100) / 100}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={s.currency_bg}></div>
        </TableContainer>
      </div>
    </>
  );
}
