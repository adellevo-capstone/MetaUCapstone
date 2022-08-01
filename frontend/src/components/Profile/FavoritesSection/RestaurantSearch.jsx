import React, { useState } from "react";
import API from "../../../utils/API";
import SearchPopup from "../../Shared/components/SearchPopup/SearchPopup";

export default function RestaurantSearch(props) {
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
    <SearchPopup
      itemsToAdd={restaurantsToAdd}
      setItemsToAdd={setRestaurantsToAdd}
      searchedItems={searchedRestaurants}
      addItems={addRestaurants}
      setSearchQuery={props.setSearchQuery}
      setLocation={props.setLocation}
      findItem={findRestaurant}
      buttonText={"Add restaurants"}
      typeToAdd={"Restaurant"}
    />
  );
}
