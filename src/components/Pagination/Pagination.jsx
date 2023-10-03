import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export const Pagination = ({ pageCount, setItemOffset }) => {
  const handlePageClick = (event) => {
    setItemOffset(event.selected + 1);
  };

  return (
    <>
      {" "}
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
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

Pagination.propTypes = {
  pageCount: PropTypes.number,
  setItemOffset: PropTypes.func,
};
