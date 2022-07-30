import React, { useEffect } from "react";
import DateContainer from "./DateContainer";

export default function TimeGrid(props) {
  let dateSlots = props.hostAvailability ? Object.keys(props.hostAvailability) : [1, 2, 3, 4];

  const addAvailability = (date, slotIndex) => {
    let currentTimesArray = props.availableTimes.get(date); // get array
    if (currentTimesArray) {
      props.setAvailableTimes((map) => new Map(map.set(date, [slotIndex, ...currentTimesArray])));
    } else {
      props.setAvailableTimes((map) => new Map(map.set(date, [slotIndex])));
    }
  };

  // helper function to remove map key
  const deleteDate = (date) => {
    props.setAvailableTimes((map) => {
      let mapCopy = new Map(map);
      mapCopy.delete(date);
      return mapCopy;
    });
  };

  const removeAvailability = (date, slotIndex) => {
    let currentTimesArray = props.availableTimes.get(date);

    // remove time slot from date's slot array
    let updatedTimes = currentTimesArray.filter((timeSlot) => timeSlot !== slotIndex);
    props.setAvailableTimes((map) => new Map(map.set(date, updatedTimes)));

    // remove date if number of slots goes down to 0
    if (currentTimesArray.length === 1) {
      deleteDate(date);
    }
  };

  const updateAvailability = (prevDate, newDate) => {
    if (props.availableTimes.size > 0) {
      // create new date with times from old date
      props.setAvailableTimes(
        (map) => new Map(map.set(newDate, props.availableTimes.get(prevDate)))
      );
      deleteDate(prevDate);
    }
  };

  const formatTime = (minuteOffset) => {
    let ending = "AM";
    let newHours = parseInt(props.startTime.substring(0, 2)) + parseInt(minuteOffset / 60);
    let minutes = props.startTime.substring(3);
    if (newHours > 12) {
      newHours -= 12;
      ending = "PM";
    }
    return `${newHours}:${minutes} ${ending}`;
  };

  // useEffect(() => {
  //   props.loadPreviousRSVP();
  // }, []);

  return (
    <div className="time-grid">
      <div className="left-container">
        {/* only display input for host */}

        <input
          className="time"
          type={props.guest ? "hidden" : "time"}
          onChange={(e) => props.setStartTime(e.target.value)}
        />

        {props.guest && <div className="spacer" />}

        {props.startTime !== "00:00" && (
          <div className="times">
            {[0, 2, 4, 6, 8, 10].map((index) => (
              <span key={index}>{formatTime(index * 30)}</span>
            ))}
          </div>
        )}
      </div>

      <div className="slots">
        {dateSlots.map((date, index) => (
          <DateContainer
            hostAvailability={props.hostAvailability}
            guest={props.guest}
            currDate={date}
            key={index}
            availableTimes={props.availableTimes}
            addAvailability={addAvailability}
            removeAvailability={removeAvailability}
            updateAvailability={updateAvailability}
            rsvpStatus={props.rsvpStatus}
            rsvpOpen={props.rsvpOpen}
          />
        ))}
      </div>
    </div>
  );
}
