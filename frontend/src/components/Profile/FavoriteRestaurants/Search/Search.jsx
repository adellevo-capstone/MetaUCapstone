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
      // const categories = res.data.categories.map((category) => category.title);
      setSearchedRestaurants(res.data);
      console.log(searchedRestaurants);

      // save to database
      // await API.patch(
      //   "api/v1/auth/dietaryProfile/modify",
      //   { updatedArray: [...props.likes, ...categories], sectionType: "Likes" },
      //   config
      // );

      // add restaurant
      // addRestaurant(res.data);

      // update with new items
      // props.loadDietaryProfile();
    } catch (err) {
      console.log(err.response);
    }
  };

  const addRestaurant = async (restaurantToAdd) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { restaurantToAdd: restaurantToAdd };
      await API.patch("api/v1/auth/dietaryProfile/addRestaurant", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-popup">
      <div>
        <h1>Restaurants to add</h1>
        {restaurantsToAdd.length > 0 && <p>{restaurantsToAdd.length}</p>}
        <div>
          {restaurantsToAdd?.length > 0 &&
            restaurantsToAdd.map((restaurant) => (
              <SearchedRestaurantCard restaurant={restaurant} />
            ))}
          <div>Confirm</div>
        </div>
      </div>

      <div className="search-popup-content">
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

      {restaurantsToAdd.length > 0 && <p>{restaurantsToAdd.length}</p>}
      <div>
        <div className="searched-restaurants">
          {searchedRestaurants?.length > 0 &&
            searchedRestaurants.map((restaurant) => (
              <SearchedRestaurantCard
                restaurantsToAdd={restaurantsToAdd}
                setRestaurantsToAdd={setRestaurantsToAdd}
                restaurant={restaurant}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
