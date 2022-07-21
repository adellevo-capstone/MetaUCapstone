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
        <span className="info-header">
          <h2>{restaurant.name}</h2>
          <div className="bookmark">
            <img
              src={bookmark}
              alt="bookmark"
            />
          </div>
        </span>
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
