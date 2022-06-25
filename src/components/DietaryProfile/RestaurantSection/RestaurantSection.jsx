import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import "./assets/RestaurantSection.css";

export default function RestaurantSection() {
  return (
    <div className="restaurant-section">
      <h1>Favorite Restaurants</h1>
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
