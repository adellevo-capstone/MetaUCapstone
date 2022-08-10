import React, { useState } from "react";

export default function PageDots({ pageNumber, setPageNumber, isGuestResponse, loadPreviousRSVP }) {
  return (
    <div className={"page-dots"}>
      <div
        className={pageNumber === 1 ? "selected" : "unselected"}
        onClick={() => setPageNumber(1)}
      />
      <div
        className={pageNumber === 2 ? "selected" : "unselected"}
        onClick={() => {
          setPageNumber(2);
          if (isGuestResponse) {
            console.log("yooo in here");
            loadPreviousRSVP();
          }
        }}
      />
      <div
        className={pageNumber === 3 ? "selected" : "unselected"}
        onClick={() => setPageNumber(3)}
      />
    </div>
  );
}
