import React from "react";
import '../pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange,perPage,setPerPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="pagination-button"
      >
        &laquo;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="pagination-button"
      >
        &raquo;
      </button>
      {/* <div className="pagination-controls"> */}
        <select
        className="pagination-button"
          value={perPage}
          onChange={(e) => {
            setPerPage(parseInt(e.target.value));
            onPageChange(1);
          }}
        >
          <option value="2">2 per page</option>
          <option value="4">4 per page</option>
          <option value="6">6 per page</option>
        </select>
      {/* </div> */}
    </div>
  );
};

export default Pagination;
