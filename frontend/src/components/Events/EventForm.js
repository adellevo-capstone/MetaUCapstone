import React, { useState } from "react";
import users from "../users.js";
import axios from "axios";

export default function EventForm() {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState("");

  //   const handleOnChangeCategories = (event) => {
  //     setLocation(event.target.value);
  //   };

  //   const handleOnChangeLocation = (event) => {
  //     setLocation(event.target.value);
  //   };

  const handleOnClick = async (event) => {
    event.preventDefault();
    // const location = "San Diego";
    const API_KEY =
      "xfVKTkVdJb7ElOAaDWNhQkSgzsvpITCSt65_LcXwTwSk2oFYuH0VRu-65wpdPXf78I5IXsEt5PWWXxYfZqZfcKDMqjSoff6lRBZyOtkiXufy3_swvlN42cG2gHuvYnYx";
    try {
      // aggregate group members' preferences
      // ideas: use likes/dislikes/frequency as weights
      let savedCategories = "";
      users.forEach((user) => {
        savedCategories += user.preferences.likes.join(",") + ", ";
      });
      await axios
        .get(
          `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
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

  return (
    <div>
      <form>
        <input
          placeholder="extra category"
          onChange={(event) => setCategories(event.target.value)}
        />
        <input
          placeholder="location"
          onChange={(event) => setLocation(event.target.value)}
        />
        <button onClick={handleOnClick}>Click me!</button>
      </form>
    </div>
  );
}
