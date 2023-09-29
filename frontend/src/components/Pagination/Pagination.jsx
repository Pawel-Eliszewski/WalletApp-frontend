import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export const PaginatedItems = ({ pageCount, setItemOffset }) => {
  const handlePageClick = (event) => {
    setItemOffset(event.selected);
  };

  return (
    <>
      {" "}
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel={" ← "}
        nextLabel={" → "}
        renderOnZeroPageCount={null}
        containerClassName={css.pagination}
        previousLinkClassName={css.paginationLink}
        nextLinkClassName={css.paginationLink}
        disabledClassName={css.paginationLinkDisabled}
        activeClassName={css.paginationLinkActive}
      />
    </>
  );
};
