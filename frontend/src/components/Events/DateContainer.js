import React, { useState, useEffect } from "react";
import TimeSlot from "./TimeSlot";

export default function DateContainer(props) {
  const slotContainers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [date, setDate] = useState([]);

  return (
    <div className="date-container">
      <input
        type="date"
        className="date"
      />
      {slotContainers.map((index) => (
        <TimeSlot
          key={index}
          timeSlot={index}
        />
      ))}
    </div>
  );
}
