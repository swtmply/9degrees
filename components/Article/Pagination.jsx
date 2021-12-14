import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  items = [],
  itemsPerPage,
  component: Component,
  className = "",
}) {
  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = itemsPerPage;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(items.length / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  return (
    <div className={`${className}`}>
      {items
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, idx) => (
          <Component key={idx} article={item} />
        ))}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={
          "pagination flex justify-between space-x-4 font-bold w-[30%]"
        }
        activeClassName={"active text-white"}
        breakClassName={"font-bold"}
        disabledClassName={"disabled"}
      />
    </div>
  );
}
