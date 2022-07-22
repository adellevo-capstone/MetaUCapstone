import React, { useState, useEffect } from "react";
import marker from "../../../Shared/assets/marker.svg";
import addButton from "../../../Shared/assets/AddButton.svg";
import deleteButton from "../../../Shared/assets/DeleteButton.svg";

export default function SearchedRestaurantCard({
  restaurant,
  setRestaurantsToAdd,
  restaurantsToAdd,
  inAdded,
}) {
  const handleClick = () => {
    let updated = new Set([...restaurantsToAdd]);

    if (inAdded) {
      updated.delete(restaurant);
    } else {
      if (updated.has(restaurant)) {
        alert("You've already added this restaurant to your list :)");
      }
      updated.add(restaurant);
    }

    setRestaurantsToAdd([...updated]);
  };

  return (
    <div className="searched-restaurant-card">
      <div className="content">
        <h2>{restaurant.name}</h2>
        <span className="location">
          <img
            className="marker"
            src={marker}
            alt="marker"
          />
          <p>{`${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state}`}</p>
        </span>
      </div>
      <div className="checkmark">
        <img
          onClick={handleClick}
          src={!inAdded ? addButton : deleteButton}
          alt="checkmark"
        />
      </div>
    </div>
  );
}
