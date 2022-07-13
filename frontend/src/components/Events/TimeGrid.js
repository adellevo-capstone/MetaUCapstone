import React, { useState, useEffect } from "react";
import DateContainer from "./DateContainer";
import "./EventForm.css";
import TimeSlot from "./TimeSlot";
// import Moment from "react-moment";
// import "moment-timezone";

export default function TimeGrid(props) {
  const [startTime, setStartTime] = useState("00:00");
  const slotDates = [0, 2, 4, 6, 8, 10];
  const [availableTimes, setAvailableTimes] = useState(new Map());
  const [slotDays, setSlotDays] = useState(["", "", "", ""]);

  const addAvailability = (date, slotIndex) => {
    let currentTimesArray = availableTimes.get(date); // get array
    if (currentTimesArray) {
      setAvailableTimes((map) => new Map(map.set(date, [slotIndex, ...currentTimesArray])));
    } else {
      setAvailableTimes((map) => new Map(map.set(date, [slotIndex])));
    }
  };

  const removeAvailability = (date, slotIndex) => {
    let currentTimesArray = availableTimes.get(date); // get array
    if (currentTimesArray) {
      const index = currentTimesArray.indexOf(slotIndex); // find time slot item
      setAvailableTimes((map) => new Map(map.set(date, currentTimesArray.splice(index, 1))));
      console.log(availableTimes);

      // remove key if number of slots goes down to 0
      if (currentTimesArray.length === 0) {
        setAvailableTimes((map) => {
          let mapCopy = new Map(map);
          mapCopy.delete(date);
          return mapCopy;
        });
        // setAvailableTimes((current) => {
        //   const copy = { ...current };
        //   delete copy[date];
        //   return copy;
        // });
      }
      console.log(availableTimes);
    }
  };

  const updateAvailability = (prevDate, newDate) => {
    if (availableTimes.size > 0) {
      // create new date with times from old date
      setAvailableTimes((map) => new Map(map.set(newDate, availableTimes.get(prevDate))));

      // delete replaced date
      setAvailableTimes((map) => {
        let mapCopy = new Map(map);
        mapCopy.delete(prevDate);
        return mapCopy;
      });
    }
    console.log(availableTimes);
  };

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

        {startTime !== "00:00" && (
          <div className="times">
            {/* {console.log(startTime.substring(0, 2))} */}
            {slotDates.map((index) => (
              <p>{formatTime(index * 30)}</p>
            ))}
          </div>
        )}
      </div>

      <div className="slots">
        {[1, 2, 3, 4].map((index) => (
          <DateContainer
            key={index}
            availableTimes={availableTimes}
            addAvailability={addAvailability}
            removeAvailability={removeAvailability}
            updateAvailability={updateAvailability}
            slotDays={slotDays}
            setSlotDays={setSlotDays}
          />
        ))}
      </div>
    </div>
  );
}
