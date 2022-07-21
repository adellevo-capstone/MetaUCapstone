import React, { useState, useEffect } from "react";
import marker from "../../../Shared/assets/marker.svg";
import unfilledCheckmark from "../../../Shared/assets/UnfilledCheck.svg";
import filledCheckmark from "../../../Shared/assets/FilledCheck.svg";

export default function SearchedRestaurantCard({
  restaurant,
  setRestaurantsToAdd,
  restaurantsToAdd,
}) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    setRestaurantsToAdd([...restaurantsToAdd, restaurant]);
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
          src={selected ? filledCheckmark : unfilledCheckmark}
          alt="checkmark"
        />
      </div>
    </div>
  );
}
