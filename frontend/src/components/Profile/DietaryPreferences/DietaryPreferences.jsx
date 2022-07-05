import React, { useState, useEffect } from "react";
import PreferenceSection from "../DietaryPreferences/PreferenceSection";
import API from "../../../utils/API";

export default function DietaryPreferences() {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);

  // ---- Load user's dietary profile ----

  useEffect(() => {
    loadDietaryProfile();
  }, []);

  const loadDietaryProfile = async () => {
    try {
      const res = await API.get("api/v1/auth/dietaryProfile");
      setLikes(res.data.dietaryProfile.likes);
      setDislikes(res.data.dietaryProfile.dislikes);
      setRestrictions(res.data.dietaryProfile.restrictions);
    } catch (err) {
      console.log(err.response);
    }
  };

  const profileSections = [
    { header: "Likes", subHeader: "My go-tos", data: likes, setData: setLikes },
    { header: "Dislikes", subHeader: "Not my taste", data: dislikes, setData: setDislikes },
    { header: "Restrictions", subHeader: "No-gos", data: restrictions, setData: setRestrictions },
  ];

  return (
    <div className="dietary-preferences">
      <h1 className="profile-header">Dietary Preferences</h1>
      {profileSections.map((section, index) => (
        <PreferenceSection
          key={index}
          header={section.header}
          subHeader={section.subHeader}
          data={section.data}
          setData={section.setData}
        />
      ))}
    </div>
  );
}
