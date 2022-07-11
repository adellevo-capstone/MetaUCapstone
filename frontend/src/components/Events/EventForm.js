import React, { useState, useEffect } from "react";
import users from "../users.js";
import axios from "axios";
import API from "../../utils/API";
// import eventDetails from "../events.js";

export default function EventForm(props) {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");
  // const [events, setEvents] = useState({});
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);

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
      const body = {
        members: intendedGroup.groupInfo.members,
        description: elements.description.value,
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
      console.log(err.message);
    }

    // update event details;
    // console.log(eventDetails);
    // const invitee = eventDetails.invitees[0];
    // invitee.hasResponded = true;
    // invitee.isAttending = true;
    // invitee.extendedPreferences = data.extraCategories.split(",");
    // invitee.availability.push(data.timeSlot);
    // console.log(eventDetails);
  };

  return (
    <div>
      <form onSubmit={(event) => createEvent(event)}>
        <h2>Create invitation</h2>
        <fieldset>
          <label htmlFor="cars">Choose a group:</label>
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

        {/* <fieldset>
        <legend>Set time slot window</legend>
        <input
          name="timeSlot"
          type="checkbox"
        />
        <label htmlFor="timeSlot">Saturday, June 21 @ 9:00pm</label>
        <br />
        <input
          name="timeSlot"
          type="checkbox"
        />
        <label htmlFor="timeSlot">Saturday, June 21 @ 10:00pm</label>
        <br />
        <input
          name="timeSlot"
          type="checkbox"
        />
        <label htmlFor="timeSlot">Sunday, June 22 @ 11:00am</label>
      </fieldset> */}

        <button type="submit">Create an invitation</button>
      </form>
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
