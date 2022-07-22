import React from "react";
import bookmark from "./assets/save.svg";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <div className="photo-container">
        <img
          className="cover"
          src={restaurant.image_url}
          width="100%"
          alt="card img"
        />
      </div>
      <div className="card-info">
        <div className="info-header">
          <h2>{restaurant.name}</h2>
          <span className="bookmark">
            <img
              src={bookmark}
              alt="bookmark"
            />
            <p>{restaurant.rating.toFixed(1)}</p>
          </span>
        </div>
        <div className="tag-list">
          {restaurant.categories.map((category, index) => (
            <p
              className="tag"
              key={index}
            >
              {category.title}{" "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
