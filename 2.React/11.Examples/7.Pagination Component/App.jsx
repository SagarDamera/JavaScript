import React, { useState } from "react";

function PaginationExample() {
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Pagination Example</h2>

      <ul>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default PaginationExample;