import React, { useState, useEffect } from "react";
import Header from "../Shared/Header";
import DietaryPreferences from "./DietaryPreferences/DietaryPreferences";
import FavoriteRestaurants from "./FavoriteRestaurants/FavoriteRestaurants";
import API from "../../utils/API";

export default function Profile() {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ---- Load user's dietary profile ----

  useEffect(() => {
    loadDietaryProfile();
  }, [likes, dislikes, restrictions]);

  const loadDietaryProfile = async () => {
    try {
      const res = await API.get("api/v1/auth/dietaryProfile");
      setLikes(res.data.dietaryProfile.likes);
      setDislikes(res.data.dietaryProfile.dislikes);
      setRestrictions(res.data.dietaryProfile.restrictions);
      setFavorites(res.data.dietaryProfile.favoriteRestaurants);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="profile">
      {/* <Header header="Profile" /> */}
      <FavoriteRestaurants
        likes={likes}
        setLikes={setLikes}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <DietaryPreferences
        likes={likes}
        setLikes={setLikes}
        dislikes={dislikes}
        setDislikes={setDislikes}
        restrictions={restrictions}
        setRestrictions={setRestrictions}
      />
    </div>
  );
}
