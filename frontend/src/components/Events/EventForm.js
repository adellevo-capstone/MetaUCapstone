import React, { useState } from "react";
import users from "../users.js";
import axios from "axios";
import eventDetails from "../events.js";

export default function EventForm() {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");

  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      let savedCategories = "";
      users.forEach((user) => {
        savedCategories += user.preferences.likes.join(",") + ", ";
      });
      await axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            params: {
              categories: savedCategories + categories,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setError(err);
    }
  };

  const handleOnClick2 = async (event) => {
    event.preventDefault();
    try {
      // aggregate group members' preferences
      let savedCategories = "";
      users.forEach((user) => {
        savedCategories += user.preferences.likes.join(",") + ", ";
      });
      await axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            params: {
              categories: savedCategories + categories,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setError(err);
    }
  };

  const handleOnSubmit = (event) => {
    // get form data
    event.preventDefault();
    const elements = event.currentTarget.elements;

    const data = {
      extraCategories: elements["extra-categories"].value,
      comment: elements.comment.value,
      transportation: elements.transportation.value,
      priceLevel: elements.priceLevel.value,
      timeSlot: elements.timeSlot.checked,
    };

    alert(`Here's your data: ${JSON.stringify(data, undefined, 2)}`);

    // update event details;
    const invitee = eventDetails.invitees[0];
    invitee.hasResponded = true;
    invitee.isAttending = true;
    invitee.extendedPreferences = data.extraCategories.split(",");
    invitee.availability.push(data.timeSlot);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="extra-categories">Extra categories</label>
      <input
        id="extra-categories"
        type="text"
      />

      <label htmlFor="comment">Comment</label>
      <textarea id="comment" />

      <label htmlFor="transportation">Transportation</label>
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

      <fieldset>
        <legend>Price Level</legend>

        <input
          id="$"
          name="priceLevel"
          type="radio"
          value="$"
        />
        <label htmlFor="$"> {"<$10"} </label>

        <input
          id="$$"
          name="priceLevel"
          type="radio"
          value="$$"
        />
        <label htmlFor="$$">$11-30</label>

        <input
          id="$$$"
          name="priceLevel"
          type="radio"
          value="$$$"
        />
        <label htmlFor="$$$">$31-60</label>

        <input
          id="$$$$"
          name="priceLevel"
          type="radio"
          value="$$$$"
        />
        <label htmlFor="$$$$">$61+</label>
      </fieldset>

      <fieldset>
        <input
          name="timeSlot"
          type="checkbox"
        />
        <label htmlFor="timeSlot">Saturday, June 21 @ 9:00pm</label>
        <br />
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}
