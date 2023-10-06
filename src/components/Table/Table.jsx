import styles from "./Table.module.css";

export function Table({ statistics }) {
  if (!statistics) {
    return null;
  }
  const { totalExpenses, totalIncome, totalCategories } = statistics;

  return (
    <>
      {!totalExpenses && !totalIncome ? null : (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeadTr}>
              <th className={styles.tabHeader}>Category</th>
              <th className={styles.tabHeader}>Sum</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {totalCategories.map((category) => (
              <tr className={styles.bodyTr} key={category.id}>
                <td className={styles.tabRow}>
                  <p
                    style={{
                      backgroundColor: category.color,
                      width: "24px",
                      height: "24px",
                      borderRadius: "2px",
                    }}
                  ></p>
                  <span className={styles.bodyText}>{category.title}</span>
                </td>
                <td className={styles.tabRow}></td>
                <td className={styles.tabRow}>
                  <span className={styles.bodyText}>
                    {category.total ? category.total : 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.total}>
        Expenses:
        <span className={styles.totalExpenses}>{totalExpenses}</span>
      </div>
      <div className={styles.total}>
        Income: <span className={styles.totalIncome}>{totalIncome}</span>
      </div>
    </>
  );
}
