import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { fixDate } from "helpers/fixDate";
import { PaginatedItems } from "../Pagination/Pagination";
import { Balance } from "components/balance/balance";
import { ButtonAddTransaction } from "../ButtonAddTransaction/ButtonAddTransaction";
import styles from "./HomeTab.module.css";
import { selectTransactions } from "../../redux/finance/selectors";

const HomeTab = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const [itemOffset, setItemOffset] = useState(0);

  const transactions = useSelector(selectTransactions);
  let length = transactions.length;

  const itemsPerPage = 5;
  const pageCount = Math.ceil(length / itemsPerPage);

  return (
    <div className={styles.homeWrapper}>
      <Balance />
      <table
        className={styles.tableWrapper}
        style={{ maxHeight: isMobile ? "60vh" : "auto", overflowY: "auto" }}
      >
        {!isMobile && (
          <>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.tableHeadItem}>Date</th>
                <th className={styles.tableHeadItem}>Type</th>
                <th className={styles.tableHeadItem}>Category</th>
                <th className={styles.tableHeadItem}>Comment</th>
                <th className={styles.tableHeadItem}>Sum</th>
                <th className={styles.tableHeadItem}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(
                ({ _id, date, type, category, comment, sum, balance }) => (
                  <tr key={_id} className={styles.data}>
                    <td className={styles.dataItem}>{fixDate(date)}</td>
                    <td className={styles.dataItem}>
                      {type === true ? "+" : "-"}
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "left" }}
                    >
                      {category}
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "left" }}
                    >
                      <span className={styles.dataComment}>{comment}</span>
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "right", fontWeight: "700" }}
                    >
                      <span
                        className={styles.dataSum}
                        data-type={type.toString()}
                      >
                        {sum}
                      </span>
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "right" }}
                    >
                      {balance}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </>
        )}
      </table>

      {isMobile && (
        <>
          {transactions.map(
            ({ _id, date, type, category, comment, sum, balance }) => (
              <ul
                key={_id}
                className={styles.dataMob}
                data-type={type.toString()}
              >
                <li className={styles.dataItemMob}>
                  <span className={styles.headItemMob}>Date</span>
                  {fixDate(date)}
                </li>
                <li className={styles.dataItemMob}>
                  <span className={styles.headItemMob}>Type</span>
                  {type === true ? "+" : "-"}
                </li>
                <li className={styles.dataItemMob}>
                  <span className={styles.headItemMob}>Category</span>
                  {category}
                </li>
                <li className={styles.dataItemMob}>
                  <span className={styles.headItemMob}>Comment</span>
                  <span className={styles.dataComment}>{comment}</span>
                </li>
                <li
                  className={styles.dataItemMob}
                  style={{ fontWeight: "700" }}
                >
                  <span className={styles.headItemMob}>Sum</span>
                  <span className={styles.dataSum} data-type={type.toString()}>
                    {sum}
                  </span>
                </li>
                <li className={styles.dataItemMob}>
                  <span className={styles.headItemMob}>Balance</span>
                  {balance}
                </li>
              </ul>
            )
          )}
        </>
      )}

      {pageCount > 1 && (
        <PaginatedItems pageCount={pageCount} setItemOffset={setItemOffset} />
      )}

      <ButtonAddTransaction />
    </div>
  );
};

export default HomeTab;
