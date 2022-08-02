import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DietaryPreferences from "./DietaryPreferences/DietaryPreferences";
import FavoriteRestaurants from "./FavoritesSection/FavoriteRestaurants/FavoriteRestaurants";
import API from "../../utils/API";

export default function Profile({ userId }) {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const params = useParams();

  // ---- Load user's dietary profile ----

  useEffect(() => {
    loadDietaryProfile();
  }, []);

  const loadDietaryProfile = async () => {
    try {
      // const res = await API.get("api/v1/auth/dietaryProfile");
      const res = await API.get(`api/v1/auth/user/${userId}`);
      setLikes(res.data.dietaryProfile.likes);
      setDislikes(res.data.dietaryProfile.dislikes);
      setRestrictions(res.data.dietaryProfile.restrictions);
      setFavorites(res.data.dietaryProfile.favoriteRestaurants.reverse());
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="profile">
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
