import React, { useState } from "react";
import NoResults from "../../../Shared/components/NoResults/NoResults";
import RestaurantCard from "../FavoriteRestaurantCard/FavoriteRestaurantCard";
import RestaurantSearch from "../RestaurantSearch";
import "./FavoriteRestaurants.css";

export default function FavoriteRestaurants(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="favorite-restaurants">
      <div className="profile-header">
        <h1>Favorite restaurants</h1>
        <RestaurantSearch
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
        {props.favorites.length === 0 ? (
          <NoResults
            message={
              "Nothing to see here yet. Click the button above to find a restaurant to add to your favorites!"
            }
          />
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
