import React, { useState, useEffect } from "react";

export default function TimeSlot(props) {
  const [selected, setSelected] = useState(props.previouslySelected);
  // console.log(props.previouslySelected);

  // useEffect(() => {
  //   if (props.rsvpStatus === "accept") {
  //     setSelected(props.previouslySelected);
  //   }
  // }, [props.rsvpStatus]);

  const handleClick = () => {
    setSelected(!selected);

    if (!selected) {
      props.addAvailability(props.date, props.slotIndex);
    } else {
      props.removeAvailability(props.date, props.slotIndex);
    }
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
