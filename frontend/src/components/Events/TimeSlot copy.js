import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TimeSlot(props) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        // isClearable
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      {console.log(new Intl.DateTimeFormat("en-US", { month: "long" }).format(startDate))}
      {console.log(startDate.getDate())}
      {console.log(startDate.getFullYear())}
      {console.log(startDate.getHours())}
      {console.log(startDate.getMinutes())}
    </div>
  );
}
