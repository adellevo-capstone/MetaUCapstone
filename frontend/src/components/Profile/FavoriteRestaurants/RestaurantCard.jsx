import React from "react";
import bookmark from "./assets/save.svg";
import deleteButton from "../../Shared/assets/DeleteButtonWhite.svg";
import API from "../../../utils/API";

export default function RestaurantCard({ restaurant, favorites, setFavorites }) {
  const removeFavorite = async () => {
    const updatedArray = favorites.filter((item) => item.id !== restaurant.id);
    try {
      // console.log(props.data);
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { updatedArray: updatedArray, sectionType: "favoriteRestaurants" };
      console.log(body);
      const res = await API.patch("api/v1/auth/dietaryProfile/modify", body, config);
      setFavorites(updatedArray);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="restaurant-card">
      <div className="photo-container">
        <img
          onClick={removeFavorite}
          className="delete-button"
          src={deleteButton}
          alt="delete"
        />
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
