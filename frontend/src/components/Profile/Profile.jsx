import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DietaryPreferences from "./DietaryPreferences/DietaryPreferences";
import FavoriteRestaurants from "./FavoritesSection/FavoriteRestaurants/FavoriteRestaurants";
import API from "../../utils/API";

export default function Profile({ isCurrentUser }) {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();

  // ---- Load user's dietary profile ----

  useEffect(() => {
    loadDietaryProfile();
  }, []);

  const loadDietaryProfile = async () => {
    try {
      const res = isCurrentUser
        ? await API.get("api/v1/auth/dietaryProfile")
        : await API.get(`api/v1/auth/user/${params.userId}`);

      if (!isCurrentUser) {
        const name = `${res.data.firstName} ${res.data.lastName}`;
        const username = res.data.username;
        setUserInfo({ name: name, username: username });
      }

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
      {!isCurrentUser && (
        <div className="user-info-header">
          <h1>{userInfo.name}</h1>
          <h2>@{userInfo.username}</h2>
        </div>
      )}
      <FavoriteRestaurants
        likes={likes}
        setLikes={setLikes}
        favorites={favorites}
        setFavorites={setFavorites}
        isCurrentUser={isCurrentUser}
      />
      <DietaryPreferences
        likes={likes}
        setLikes={setLikes}
        dislikes={dislikes}
        setDislikes={setDislikes}
        restrictions={restrictions}
        setRestrictions={setRestrictions}
        isCurrentUser={isCurrentUser}
      />
    </div>
  );
}
