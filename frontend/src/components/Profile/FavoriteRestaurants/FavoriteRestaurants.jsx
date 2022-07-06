import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search/Search";
import API from "../../../utils/API";
import Popup from "reactjs-popup";

export default function FavoriteRestaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);
  // const [newRestaurant, setNewRestaurant] = useState("");

  // ---- Get all favorite restaurants from dietary profile ----

  useEffect(() => {
    loadFavoriteRestaurants();
  }, []);

  const loadFavoriteRestaurants = async () => {
    try {
      const res = await API.get("api/v1/auth/dietaryProfile");
      setFavorites(res.data.dietaryProfile.favoriteRestaurants);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="favorite-restaurants">
      <div className="profile-header">
        <h1>Favorite Restaurants</h1>
        {/* <Popup
          trigger={<h2>Discover similar</h2>}
          position="right center"
        >
          <div>blah</div>
        </Popup> */}
        <Popup
          closeOnDocumentClick
          modal
          nested
          trigger={<button> Add a restaurant </button>}
          style={{
            minWidth: "40em",
          }}
        >
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            loadFavoriteRestaurants={loadFavoriteRestaurants}
            // setNewRestaurant={setNewRestaurant}
          />
        </Popup>
        {/* <button onClick={}>Add a restaurant</button> */}
        {/* <span>Sort: Recommended</span> */}
      </div>
      <div className="restaurant-card-container">
        {/* {props.data.length === 0 && !inEditMode ? (
          <p className="nothing-message">Nothing to see here.</p>
        ) : (
          props.data.map((tag) => (
            <Tag
              key={tag}
              text={tag}
              data={props.data}
              setData={props.setData}
              inEditMode={inEditMode}
              setEditMode={setEditMode}
              sectionType={props.header}
            />
          ))
        )} */}
        {!favorites ? (
          <p className="nothing-message">Nothing to see here.</p>
        ) : (
          favorites.map((restaurant) => <RestaurantCard restaurant={restaurant} />)
        )}
      </div>
    </div>
  );
}
