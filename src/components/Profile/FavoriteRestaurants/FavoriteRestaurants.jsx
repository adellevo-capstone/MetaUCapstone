import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default function FavoriteRestaurants() {
  return (
    <div className="favorite-restaurants">
      <div className="profile-header">
        <h1>Favorite Restaurants</h1>
        <span>Sort: Recommended</span>
      </div>
      <div className="restaurant-card-container">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
}
