import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateTransaction,
  deleteTransaction,
} from "../../redux/finance/operations";
import { useMedia } from "react-use";
import { PaginatedItems } from "../Pagination/Pagination";
// import { selectTransactions } from "../../redux/finance/selectors";
import styles from "./HomeTab.module.css";

export const HomeTab = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const [itemOffset, setItemOffset] = useState(0);

  const dispatch = useDispatch();

  // const transactions = useSelector(selectTransactions);

  const transactions = [
    {
      _id: "1",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "blanty",
      sum: "1000",
    },
    {
      _id: "2",
      date: "21.01.20",
      type: "expense",
      category: "Car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "3",
      date: "21.01.20",
      type: "income",
      category: "Household products",
      comment: "fajki",
      sum: "100",
    },
    {
      _id: "4",
      date: "21.01.20",
      type: "income",
      category: "Other expenses",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "5",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "meta",
      sum: "10000",
    },
    {
      _id: "6",
      date: "21.01.20",
      type: "expense",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "7",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "wóda",
      sum: "100",
    },
    {
      _id: "8",
      date: "21.01.20",
      type: "expense",
      category: "car",
      comment: "paliwo",
      sum: "100",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
    {
      _id: "9",
      date: "21.01.20",
      type: "income",
      category: "car",
      comment: "paliwo",
      sum: "1000",
    },
  ];

  let length = transactions.length;

  const itemsPerPage = 5;
  const pageCount = Math.ceil(length / itemsPerPage);

  const handleEdit = (transactionId) => {
    dispatch(updateTransaction(transactionId));
  };

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  return (
    <div className={styles.homeWrapper}>
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
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {transactions.map(
                ({ _id, date, type, category, comment, sum }) => (
                  <tr key={_id} className={styles.data}>
                    <td className={styles.dataItem}>{date}</td>
                    <td className={styles.dataItem}>
                      {type === "income" ? "+" : "-"}
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
                      <span className={styles.dataSum} data-type={type}>
                        {sum}
                      </span>
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "right" }}
                    >
                      <button
                        onClick={() => handleEdit(_id)}
                        key={_id}
                        className={styles.dataItemBtnEdit}
                      >
                        <img src={"./assets/icon-pen.svg"} />
                      </button>
                    </td>
                    <td
                      className={styles.dataItem}
                      style={{ textAlign: "right" }}
                    >
                      <button
                        key={_id}
                        onClick={() => handleDelete(_id)}
                        className={styles.dataItemBtnDelete}
                      >
                        Delete
                      </button>
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
          {transactions.map(({ _id, date, type, category, comment, sum }) => (
            <ul key={_id} className={styles.dataMob} data-type={type}>
              <li className={styles.dataItemMob}>
                <span className={styles.headItemMob}>Date</span>
                {date}
              </li>
              <li className={styles.dataItemMob}>
                <span className={styles.headItemMob}>Type</span>
                {type === "income" ? "+" : "-"}
              </li>
              <li className={styles.dataItemMob}>
                <span className={styles.headItemMob}>Category</span>
                {category}
              </li>
              <li className={styles.dataItemMob}>
                <span className={styles.headItemMob}>Comment</span>
                <span className={styles.dataComment}>{comment}</span>
              </li>
              <li className={styles.dataItemMob} style={{ fontWeight: "700" }}>
                <span className={styles.headItemMob}>Sum</span>
                <span className={styles.dataSum} data-type={type.toString()}>
                  {sum}
                </span>
              </li>
              <div className={styles.buttonsWrapper}>
                <button
                  key={_id}
                  onClick={() => handleDelete(_id)}
                  className={styles.dataItemBtnDelete}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(_id)}
                  key={_id}
                  className={styles.dataItemBtnEdit}
                >
                  <img
                    className={styles.btnIcon}
                    src={"./assets/icon-pen.svg"}
                  />
                  Edit
                </button>
              </div>
            </ul>
          ))}
        </>
      )}

      {pageCount > 1 && (
        <PaginatedItems pageCount={pageCount} setItemOffset={setItemOffset} />
      )}
    </div>
  );
};
