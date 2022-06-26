import React, { useState } from "react";
import Header from "../Shared/Header";
import DietaryPreferences from "./DietaryPreferences/DietaryPreferences";
import RestaurantSection from "./FavoriteRestaurants/FavoriteRestaurants";

export default function Profile() {
  return (
    <div className="profile">
      <Header header="Profile" />
      <RestaurantSection />
      <DietaryPreferences />
    </div>
  );
}
