import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search/Search";
import API from "../../../utils/API";
import Popup from "reactjs-popup";

export default function FavoriteRestaurants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);

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
          />
        </Popup>
      </div>
      <div className="restaurant-card-container">
        {!favorites ? (
          <p className="nothing-message">Nothing to see here.</p>
        ) : (
          favorites.map((restaurant) => <RestaurantCard restaurant={restaurant} />)
        )}
      </div>
    </div>
  );
}
