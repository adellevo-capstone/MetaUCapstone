import React, { useState, useEffect } from "react";

export default function TimeSlot(props) {
  const [selected, setSelected] = useState(false);

  const handleClick = (event) => {
    setSelected((prevSelected) => !prevSelected);
    event.currentTarget.classList.toggle(".selected-slot");

    if (!selected) {
      props.addAvailability(props.date, props.slotIndex);
    } else {
      props.removeAvailability(props.date, props.slotIndex);
    }
    console.log(props.availableTimes);
  };

  return (
    <div>
      {!props.validSlot ? (
        <div className={"invalid"} />
      ) : (
        <div
          className={selected ? "valid-selected" : "valid-unselected"}
          onClick={handleClick}
        />
      )}
    </div>
  );
}
