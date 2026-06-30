import React, { useState } from "react";

const items = [
  "User 1",
  "User 2",
  "User 3",
  "User 4",
  "User 5",
  "User 6",
  "User 7",
  "User 8",
  "User 9",
  "User 10",
];

const itemsPerPage = 3;

function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div data-testid="pagination-container">
      <h2 data-testid="pagination-title">Pagination Example</h2>

      <ul data-testid="items-list">
        {currentItems.map((item, index) => (
          <li key={item} data-testid={`item-${index + 1}`}>
            {item}
          </li>
        ))}
      </ul>

      <button
        data-testid="previous-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span data-testid="page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        data-testid="next-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationExample;
