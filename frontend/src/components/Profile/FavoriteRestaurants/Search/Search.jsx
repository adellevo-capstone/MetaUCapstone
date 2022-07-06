import React, { useState } from "react";
import axios from "axios";
import API from "../../../../utils/API";

export default function Search({ searchQuery, setSearchQuery, location, setLocation }) {
  //   const [restaurant, setRestaurant] = useState("");

  const onClick = async () => {
    try {
      await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchQuery}&location=${location}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        )
        .then((res) => {
          console.log();
          addRestaurant(res.data.businesses[0]);
          // setRestaurant(res.data.businesses[0]);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const addRestaurant = async (restaurantToAdd) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { restaurantToAdd: restaurantToAdd };
      await API.patch("api/v1/auth/dietaryProfile/addRestaurant", body, config);
      // await API.patch("api/v1/auth/dietaryProfile/delete", body, config);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Add a restaurant</h1>
      <input
        className="search"
        type="text"
        name="restaurant"
        placeholder="Restaurant name"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        className="search"
        type="text"
        name="locatioh"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={onClick}>Search</button>
    </div>
  );
}
