import React, { useState } from "react";
import cardImg from "./assets/card-img.png";

export default function RestaurantCard() {
  return (
    <div className="restaurant-card">
      <div className="photo-container">
        <img
          src={cardImg}
          alt="card img"
        />
      </div>
      <div className="card-info">
        <h2>Boba Galaxy</h2>
        {/* <h3>$$ | Open</h3> */}
        <div className="tag-list">
          <p className="tag">Bubble Tea </p>
          <p className="tag"> Juice Bar and Smoothies</p>
        </div>
      </div>
    </div>
  );
}
