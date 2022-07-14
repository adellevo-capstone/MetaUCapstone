import React, { useState, useEffect, useRef } from "react";
import TimeSlot from "./TimeSlot";

export default function DateContainer(props) {
  const slotContainers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // let prevDate;
  const [prevDate, setPrevDate] = useState("");
  const [currDate, setCurrDate] = useState("");
  // const prevDate = useRef(null);

  useEffect(() => {
    // prevDate.current = currDate;
    // console.log(prevDate);
    // console.log(currDate);
    if (prevDate && prevDate !== "") {
      // console.log(prevDate);
      // console.log(currDate);
      props.updateAvailability(prevDate, currDate);
    }
    // props.updateAvailability(index, currDate);
  }, [currDate]);

  useEffect(() => {
    if (props.guest) {
      setCurrDate(props.currDate);
    }
  }, []);

  return (
    <div className="date-container">
      {/* only display input for host */}
      {!props.guest && (
        <input
          type="date"
          className="date"
          onClick={(e) => {
            // e.target.setAttribute("oldvalue", e.target.value);
            // console.log(e.target.getAttribute("oldvalue"));
            //  e.target.getAttribute("oldvalue");
            setPrevDate(e.target.value);
          }}
          onChange={(e) => {
            // console.log(e);
            setCurrDate(e.target.value);
          }}
        />
      )}
      {currDate || props.guest ? (
        slotContainers.map((index) => (
          <TimeSlot
            key={index}
            date={currDate}
            slotIndex={index}
            availableTimes={props.availableTimes}
            addAvailability={props.addAvailability}
            removeAvailability={props.removeAvailability}
            updateAvailability={props.updateAvailability}
            // slotDays={props.slotDays}
            // setSlotDays={props.setSlotDays}
          />
        ))
      ) : (
        <p>Select a date </p>
      )}
    </div>
  );
}
