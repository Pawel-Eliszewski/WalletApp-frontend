import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsModalEditTransactionOpen } from "../../redux/global/globalSlice";
import { deleteTransaction } from "../../redux/finance/operations";
import { useMedia } from "react-use";
import { Pagination } from "../Pagination/Pagination";
import { paginateTransactions } from "../../utils/pagination";
import { nanoid } from "nanoid";
import styles from "./HomeTab.module.css";

export const HomeTab = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const [itemOffset, setItemOffset] = useState(1);

  const dispatch = useDispatch();

  let paginationData = paginateTransactions(itemOffset);
  let transactions = paginationData.paginatedTransactions;
  let pageCount = paginationData.pages;

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  const openModalEditTransaction = () => {
    dispatch(setIsModalEditTransactionOpen(true));
    document.body.style.overflow = "hidden";
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
              <tr key={nanoid()} className={styles.tableHead}>
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
                  <tr key={nanoid()} className={styles.data}>
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
                      <div className={styles.buttonsWrapper}>
                        <button
                          onClick={openModalEditTransaction}
                          className={styles.dataItemBtnEdit}
                        >
                          <img
                            className={styles.btnIcon}
                            src={"./assets/icon-pen.svg"}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(_id)}
                          className={styles.dataItemBtnDelete}
                        >
                          Delete
                        </button>
                      </div>
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
            <ul key={nanoid()} className={styles.dataMob} data-type={type}>
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
              <div className={styles.buttonsWrapperMob}>
                <button
                  onClick={() => handleDelete(_id)}
                  className={styles.dataItemBtnDelete}
                >
                  Delete
                </button>
                <button
                  onClick={openModalEditTransaction}
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
        <Pagination pageCount={pageCount} setItemOffset={setItemOffset} />
      )}
    </div>
  );
};
