import React, { useState } from "react";
import API from "../../../../utils/API";
import SearchedRestaurantCard from "./SearchedRestaurantCard";

export default function Search(props) {
  const [restaurantsToAdd, setRestaurantsToAdd] = useState([]);
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);

  const findRestaurant = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { location: props.location, searchQuery: props.searchQuery };

      // add categories to likes
      const res = await API.post("api/v1/auth/restaurantInfo", body, config);
      setSearchedRestaurants(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const addRestaurants = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { restaurantsToAdd: restaurantsToAdd };

      // add restaurants to user's profile
      await API.patch("api/v1/auth/dietaryProfile/addRestaurants", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-popup">
      <div className="find-a-restaurant">
        <div className="popup-header">
          <h1>Find a restaurant</h1>
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
          <button onClick={findRestaurant}>Search</button>
        </div>

        <div className="searched-restaurants">
          {searchedRestaurants?.length > 0 &&
            searchedRestaurants?.map((restaurant, index) => (
              <SearchedRestaurantCard
                key={index}
                restaurantsToAdd={restaurantsToAdd}
                setRestaurantsToAdd={setRestaurantsToAdd}
                restaurant={restaurant}
                searchedRestaurants={searchedRestaurants}
                inAdded={false}
              />
            ))}
        </div>
      </div>
      <div className="restaurants-to-add">
        <div className="popup-header">
          <h1>Restaurants to add</h1>
          {restaurantsToAdd?.length > 0 && <p>{restaurantsToAdd.length}</p>}
        </div>
        <div className="added-restaurants">
          {restaurantsToAdd?.length > 0 &&
            restaurantsToAdd?.map((restaurant, index) => (
              <SearchedRestaurantCard
                key={index}
                restaurantsToAdd={restaurantsToAdd}
                setRestaurantsToAdd={setRestaurantsToAdd}
                restaurant={restaurant}
                searchedRestaurants={searchedRestaurants}
                inAdded={true}
              />
            ))}
        </div>
        <span
          onClick={addRestaurants}
          className="button"
        >
          {" "}
          Confirm{" "}
        </span>
      </div>
    </div>
  );
}
