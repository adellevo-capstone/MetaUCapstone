import React, { useState } from "react";
import TagSection from "./TagSection/TagSection";
import "./assets/DietaryProfile.css";

export default function DietaryProfile(props) {
  const sectionLabels = [
    { header: "Likes", subHeader: "My go-tos" },
    { header: "Dislikes", subHeader: "Not really my taste" },
    { header: "Restrictions", subHeader: "No-gos" },
  ];
  return (
    <>
      {sectionLabels.map((label, index) => (
        <TagSection
          key={index}
          header={label.header}
          subHeader={label.subHeader}
          data={props.data}
        />
      ))}
    </>
  );
}
