import React, { useState } from "react";
import axios from "axios";
import API from "../../../../utils/API";

export default function Search(props) {
  //   const [restaurant, setRestaurant] = useState("");

  const findRestaurant = async () => {
    console.log("hello");
    try {
      await axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${props.searchQuery}&location=${props.location}`,
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
      props.loadFavoriteRestaurants();
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <div className="search-popup">
      <h1>Add a restaurant</h1>
      <div className="search-popup-content">
        <input
          className="search"
          type="text"
          name="restaurant"
          placeholder="Restaurant name"
          onChange={(e) => props.setSearchQuery(e.target.value)}
        />
        <input
          className="search"
          type="text"
          name="location"
          placeholder="Location"
          onChange={(e) => props.setLocation(e.target.value)}
        />
      </div>
      <button onClick={findRestaurant}>Search</button>
    </div>
  );
}
