import React, { useState, useEffect } from "react";

export default function TimeSlot(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    setSelected(!selected);
    event.currentTarget.classList.toggle(".selected-slot");
    console.log(event.currentTarget.classList);
  };

  return (
    <div
      className={selected ? "selected-slot" : "time-slot"}
      onClick={handleClick}
    ></div>
  );
}
