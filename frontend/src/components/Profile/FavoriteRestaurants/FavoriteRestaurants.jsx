import React, { useState, useEffect, useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search/Search";
import "./assets/FavoriteRestaurants.css";

export default function FavoriteRestaurants(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="favorite-restaurants">
      <div className="profile-header">
        <h1>Favorite restaurants</h1>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          loadFavoriteRestaurants={props.loadFavoriteRestaurants}
          likes={props.likes}
          setLikes={props.setLikes}
        />
      </div>
      <div className="restaurant-card-container">
        {!props.favorites ? (
          <p className="nothing-message">Nothing to see here.</p>
        ) : (
          props.favorites.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              restaurant={restaurant}
              favorites={props.favorites}
              setFavorites={props.setFavorites}
            />
          ))
        )}
      </div>
    </div>
  );
}
