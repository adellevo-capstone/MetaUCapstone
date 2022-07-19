import React from "react";
import API from "../../../../utils/API";

export default function Search(props) {
  const findRestaurant = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { location: props.location, searchQuery: props.searchQuery };

      // add categories to likes
      const res = await API.post("api/v1/auth/restaurantInfo", body, config);
      const categories = res.data.categories.map((category) => category.title);

      // save to database
      await API.patch(
        "api/v1/auth/dietaryProfile/modify",
        { updatedArray: [...props.likes, ...categories], sectionType: "Likes" },
        config
      );

      // add restaurant
      addRestaurant(res.data);

      // update with new items
      props.loadDietaryProfile();
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
