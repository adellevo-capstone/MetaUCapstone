import React from "react";
import PreferenceSection from "../DietaryPreferences/PreferenceSection";

export default function DietaryPreferences(props) {
  const profileSections = [
    { header: "Likes", subHeader: "My go-tos", data: props.likes, setData: props.setLikes },
    {
      header: "Dislikes",
      subHeader: "Not my taste",
      data: props.dislikes,
      setData: props.setDislikes,
    },
    {
      header: "Restrictions",
      subHeader: "No-gos",
      data: props.restrictions,
      setData: props.setRestrictions,
    },
  ];

  return (
    <div className="dietary-preferences">
      <h1 className="profile-header">Dietary preferences</h1>
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
