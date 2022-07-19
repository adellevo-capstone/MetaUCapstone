import React from "react";

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
