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
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
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
