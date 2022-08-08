import React from "react";

export default function PageDots({ pageNumber, setPageNumber }) {
  return (
    <div className="page-dots">
      <div
        className={pageNumber === 1 ? "selected" : "unselected"}
        onClick={() => setPageNumber(1)}
      />
      <div
        className={pageNumber === 2 ? "selected" : "unselected"}
        onClick={() => setPageNumber(2)}
      />
      <div
        className={pageNumber === 3 ? "selected" : "unselected"}
        onClick={() => setPageNumber(3)}
      />
    </div>
  );
}
