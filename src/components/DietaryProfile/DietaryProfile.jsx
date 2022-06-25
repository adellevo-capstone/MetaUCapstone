import React, { useState } from "react";
import TagSection from "./ProfileSection/TagSection";
import "./assets/DietaryProfile.css";
import RestaurantSection from "./RestaurantSection/RestaurantSection";

export default function DietaryProfile(props) {
  const [likes, setLikes] = useState(["mango"]);
  const [dislikes, setDislikes] = useState(["ravioli", "beef"]);
  const [restrictions, setRestrictions] = useState([]);

  const profileSections = [
    { header: "Likes", subHeader: "My go-tos", data: likes, setData: setLikes },
    { header: "Dislikes", subHeader: "Not really my taste", data: dislikes, setData: setDislikes },
    { header: "Restrictions", subHeader: "No-gos", data: restrictions, setData: setRestrictions },
  ];

  return (
    <div className="dietary-profile">
      {profileSections.map((section, index) => (
        <TagSection
          key={index}
          header={section.header}
          subHeader={section.subHeader}
          data={section.data}
          setData={section.setData}
        />
      ))}
      <RestaurantSection />
    </div>
  );
}
