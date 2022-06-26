import React, { useState } from "react";
import PreferenceSection from "../DietaryPreferences/PreferenceSection";

export default function DietaryPreferences() {
  const [likes, setLikes] = useState(["mango"]);
  const [dislikes, setDislikes] = useState(["ravioli", "beef"]);
  const [restrictions, setRestrictions] = useState([]);

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
