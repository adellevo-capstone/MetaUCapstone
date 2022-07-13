import React, { useState, useEffect } from "react";

export default function TimeSlot(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    // console.log(event.currentTarget.classList);
    // console.log(selected);
    // console.log(!selected);
    setSelected((prevSelected) => !prevSelected);
    event.currentTarget.classList.toggle(".selected-slot");
    console.log(selected);

    if (!selected) {
      props.addAvailability(props.date, props.slotIndex);
    } else {
      props.removeAvailability(props.date, props.slotIndex);
    }
    console.log(props.availableTimes);
  };

  return (
    <div
      className={selected ? "selected-slot" : "time-slot"}
      onClick={handleClick}
    ></div>
  );
}
