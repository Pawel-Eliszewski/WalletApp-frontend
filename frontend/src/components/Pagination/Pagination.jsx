import ReactPaginate from "react-paginate";
import "./pagination.scss";

export function PaginatedItems({ pageCount, setItemOffset }) {
  const handlePageClick = (event) => {
    setItemOffset(event.selected);
  };

  return (
    <>
      {" "}
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
}
