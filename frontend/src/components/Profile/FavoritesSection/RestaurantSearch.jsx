import React, { useState } from "react";
import API from "../../../utils/API";
import SearchPopup from "../../Shared/components/SearchPopup/SearchPopup";

export default function RestaurantSearch(props) {
  const [restaurantsToAdd, setRestaurantsToAdd] = useState([]);
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const ROUTE_PREFIX = "api/v1/auth";

  const findRestaurant = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { location: props.location, searchQuery: props.searchQuery };
      const route = `${ROUTE_PREFIX}/restaurantInfo`;

      // add categories to likes
      const res = await API.post(route, body, config);
      setSearchedRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addRestaurants = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { restaurantsToAdd: restaurantsToAdd };
      const route = `${ROUTE_PREFIX}/dietaryProfile/addRestaurants`;

      // add restaurants to user's profile
      await API.patch(route, body, config);
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
