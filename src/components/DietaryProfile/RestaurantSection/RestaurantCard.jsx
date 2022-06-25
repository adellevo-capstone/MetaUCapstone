import React, { useState } from "react";
import cardImg from "./assets/card-img.png";

export default function RestaurantCard() {
  return (
    <div className="restaurant-card">
      <img
        src={cardImg}
        alt="card img"
      />
      <h2>Boba Galaxy</h2>
      <div className="tags">
        <div className="tag-container">
          <span className="tag-text">{"Bubble Tea"}</span>
        </div>
        <div className="tag-container">
          <span className="tag-text">{"Juice Bar and Smoothies"}</span>
        </div>
      </div>
    </div>
  );
}
