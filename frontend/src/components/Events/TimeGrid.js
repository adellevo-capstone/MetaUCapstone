import React, { useState, useEffect } from "react";
import DateContainer from "./DateContainer";
import "./EventForm.css";
import TimeSlot from "./TimeSlot";
// import Moment from "react-moment";
// import "moment-timezone";

export default function TimeGrid(props) {
  const [startTime, setStartTime] = useState("00:00");
  const slotDates = [0, 2, 4, 6, 8, 10];

  //   let minutesToAdd = 30;
  //   let currentDate = new Date();
  //   let futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
  //   console.log(futureDate);

  const formatTime = (minuteOffset) => {
    let ending = "AM";
    let newHours = parseInt(startTime.substring(0, 2)) + parseInt(minuteOffset / 60);
    let minutes = startTime.substring(3);
    if (newHours > 12) {
      newHours -= 12;
      ending = "PM";
    }
    return `${newHours}:${minutes} ${ending}`;
    // let newHours = parseInt(startTime.substring(0, 2)) + parseInt(minuteOffset / 60);
    // let newMinutes = parseInt(startTime.substring(2)) + parseInt(minuteOffset % 60);
    // if (newMinutes === 0) {
    //   newMinutes = "00";
    // }
    // return `${newHours}:${newMinutes} ${ending}`;
  };

  return (
    <div className="time-grid">
      <div className="left-container">
        <input
          className="time"
          type="time"
          max="22:00"
          onChange={(e) => setStartTime(e.target.value)}
        />

        <div className="times">
          {/* {console.log(startTime.substring(0, 2))} */}
          {slotDates.map((index) => (
            <p>{formatTime(index * 30)}</p>
          ))}
        </div>
      </div>

      <div className="slots">
        <DateContainer />
        <DateContainer />
        <DateContainer />
        <DateContainer />
      </div>
    </div>
  );
}
