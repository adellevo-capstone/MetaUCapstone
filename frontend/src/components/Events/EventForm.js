import React, { useState, useEffect } from "react";
import users from "../users.js";
import axios from "axios";
import API from "../../utils/API";
// import eventDetails from "../events.js";

import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "./EventForm.css";
import TimeSlot from "./TimeSlot.js";
import TimeGrid from "./TimeGrid.js";

// import React, { useState } from "react";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// function App() {
//   return <DayTimePicker timeSlotSizeMinutes={15} />;
// }
// const target = document.getElementById('root');
// render(<App />, target);

export default function EventForm(props) {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  // const [events, setEvents] = useState({});
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  // const [numTimeSlots, setNumTimeSlots] = useState([]);

  useEffect(() => {
    loadAllEvents();
  }, []);

  const loadAllEvents = async () => {
    try {
      const res = await API.get("api/v1/auth/events");
      console.log(res.data);
      setHosted(res.data.hosted);
      setInvitedTo(res.data.invitedTo);
      // console.log(events);
    } catch (err) {
      console.log(err.response);
    }
  };

  //   const handleOnChangeCategories = (event) => {
  //     setLocation(event.target.value);
  //   };

  //   const handleOnChangeLocation = (event) => {
  //     setLocation(event.target.value);
  //   };

  // const handleOnClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let savedCategories = "";
  //     users.forEach((user) => {
  //       savedCategories += user.preferences.likes.join(",") + ", ";
  //     });
  //     await axios
  //       .get(
  //         `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${location}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  //           },
  //           params: {
  //             categories: savedCategories + categories,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // const handleOnClick2 = async (event) => {
  //   event.preventDefault();
  //   try {
  //     // aggregate group members' preferences
  //     // ideas: use likes/dislikes/frequency as weights
  //     let savedCategories = "";
  //     users.forEach((user) => {
  //       savedCategories += user.preferences.likes.join(",") + ", ";
  //     });
  //     await axios
  //       .get(
  //         `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${location}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  //           },
  //           params: {
  //             categories: savedCategories + categories,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  const createEvent = async (event) => {
    try {
      // get form data
      event.preventDefault();
      const config = { headers: { "Content-Type": "application/json" } };

      const elements = event.currentTarget.elements;
      console.log(elements["group-member-ids"].value);
      console.log(props.groups);
      const intendedGroup = props.groups.find(
        (group) => group.groupInfo._id === elements["group-member-ids"].value
      );
      console.log(intendedGroup.groupInfo.members);
      const formattedSlots = timeSlots.map((slot) => {
        const { month, day, year, hour, minute } = slot;
        const formattedDay = `${month.name} ${day}, ${year}`;
        return `${formattedDay} @ ` + formatTime(`${hour}:${minute}`);
      });

      const body = {
        members: intendedGroup.groupInfo.members,
        description: elements.description.value,
        rsvpDeadline: `${elements["rsvp-date"].value}T${elements["rsvp-time"].value}:00`,
        timeSlots: formattedSlots,
        // rsvpDate: elements["rsvp-date"].value,
        // rsvpTime: elements["rsvp-time"].value,
        // transportation: elements.transportation.value,
        priceLevel: elements.priceLevel.value,
        distanceLevel: elements.distanceLevel.value,
        weightedLikes: elements["extra-categories"].value.split(","),
        // timeSlot: elements.timeSlot.checked,
      };

      // alert(`Here's your data: ${JSON.stringify(body, undefined, 2)}`);

      await API.patch("api/v1/auth/event/create", body, config);
    } catch (err) {
      console.log(err);
      // console.log(err.message);
    }
  };

  // const [values, setValues] = useState(
  //   [1, 2, 3].map((number) =>
  //     new DateObject().set({
  //       day: number,
  //       hour: number,
  //       minute: number,
  //       second: number,
  //     })
  //   )
  // );

  const [timeSlots, setTimeSlots] = useState([]);

  const formatTime = (time) => {
    const hour = parseInt(time.substring(0, 3));
    if (hour > 12) {
      return hour - 12 + ":" + time.substring(3) + " PM";
    } else {
      return time + " AM";
    }
  };

  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <h2>Create invitation</h2>
      <form onSubmit={(event) => createEvent(event)}>
        <div className="content">
          <div className="planning">
            <fieldset>
              <legend>Choose a group</legend>
              <select
                name="groups"
                id="group-member-ids"
              >
                {props.groups.map((group) => (
                  <option
                    key={group.groupInfo._id}
                    value={group.groupInfo._id}
                  >
                    {group.groupInfo.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset>
              <legend>Pick an RSVP deadline</legend>
              <input
                id="date-1"
                type="datetime-local"
              />
              {/* <input
            id="rsvp-date"
            type="date"
          />
          <input
            id="rsvp-time"
            type="time"
          /> */}
            </fieldset>
            <fieldset className="time-slot-field">
              <legend>Pick time slots</legend>
              {/* <input
            placeholder="length of event"
            id="time-slot-num"
            type="number"
          /> */}

              <TimeGrid />

              {/* <input
                className="time-slot"
                id="date-1"
                type="datetime-local"
              />
              <input
                className="time-slot"
                id="date-2"
                type="datetime-local"
              />
              <input
                className="time-slot"
                id="date-3"
                type="datetime-local"
              /> */}

              {/* <input
            type="date"
            id="start"
            name="trip-start"
            value="2018-07-22"
            min="2018-01-01"
            max="2018-12-31"
          /> */}

              {/* <TimeSlot />
          <TimeSlot />
          <TimeSlot /> */}

              {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            // isClearable
            dateFormat="MMMM d, yyyy h:mm aa"
          /> */}

              {/* ------ other calendar ------ */}

              {/* <Calendar
                value={timeSlots}
                onChange={setTimeSlots}
                format="MM/DD/YY HH:mm"
                multiple
                plugins={[
                  <TimePicker
                    position="right"
                    hideSeconds
                  />,
                  <DatePanel
                    markFocused
                    position="right"
                  />,
                ]}
              /> */}

              {/* ------ other calendar ------ */}
            </fieldset>
          </div>

          <div className="filters">
            <fieldset>
              <legend>Extra categories</legend>
              {/* <label htmlFor="extra-categories">Extra categories</label> */}
              <input
                id="extra-categories"
                type="text"
              />
            </fieldset>

            <fieldset>
              <legend>Description</legend>
              {/* <label htmlFor="comment">Comment</label> */}
              <textarea id="description" />
            </fieldset>

            <fieldset>
              <legend>Transportation</legend>
              {/* <label htmlFor="transportation">Transportation</label> */}
              <select
                id="transportation"
                selected
              >
                <option
                  value=""
                  disabled
                >
                  Select carpool needs
                </option>
                <option value="driver">Driver</option>
                <option value="rider">Rider</option>
                <option value="none">N/A</option>
              </select>
            </fieldset>

            <fieldset>
              <legend>Price Level</legend>

              <input
                id="$"
                name="priceLevel"
                type="radio"
                value={1}
              />
              <label htmlFor="$"> {"<$10"} </label>

              <input
                id="$$"
                name="priceLevel"
                type="radio"
                value={2}
              />
              <label htmlFor="$$">$11-30</label>

              <input
                id="$$$"
                name="priceLevel"
                type="radio"
                value={3}
              />
              <label htmlFor="$$$">$31-60</label>

              <input
                id="$$$$"
                name="priceLevel"
                type="radio"
                value={4}
              />
              <label htmlFor="$$$$">$61+</label>
            </fieldset>

            <fieldset>
              <legend>Distance</legend>

              <input
                id="trash"
                name="distanceLevel"
                type="radio"
                value={1}
              />
              <label htmlFor="level-1">1</label>

              <input
                id="okay"
                name="distanceLevel"
                type="radio"
                value={2}
              />
              <label htmlFor="level-2">2</label>

              <input
                id="amazing"
                name="distanceLevel"
                type="radio"
                value={3}
              />
              <label htmlFor="level-3">3</label>

              <input
                id="amazing"
                name="distanceLevel"
                type="radio"
                value={4}
              />
              <label htmlFor="level-4">4</label>
            </fieldset>
          </div>
        </div>

        <button type="submit">Create an invitation</button>
      </form>
      <div>
        <h2>Pending invitations</h2>
      </div>
      <div>
        <h2>Events I created</h2>
        {hosted.map((event, index) => (
          <p key={index}>{event.eventDetails.description}</p>
        ))}
      </div>
      <div>
        <h2>Events I was invited to</h2>
        {invitedTo.map((event, index) => (
          <p key={index}>{event.eventDetails}</p>
        ))}
      </div>
    </div>
  );
}
