import React, { useState, useEffect } from "react";
import cardImg from "./assets/card-img.png";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <div className="photo-container">
        <img
          src={restaurant.image_url}
          width="100%"
          alt="card img"
        />
      </div>
      <div className="card-info">
        <h2>{restaurant.name}</h2>
        {/* <h3>$$ | Open</h3> */}
        <div className="tag-list">
          {restaurant.categories.map((category) => (
            <p className="tag">{category.title} </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// 9:50
