import React, { useState } from "react";
import ProfileTag from "../ProfileTag/ProfileTag";
import "./ProfileBar.css";

export default function ProfileBar({ data, header, subHeader }) {
  return (
    <div className="profileBar">
      <div className="label">
        <h1>{header}</h1>
        <h2>{subHeader}</h2>
      </div>
      <div className="tagsContainer">
        {data.map((item) => (
          <ProfileTag
            key={item}
            text={item}
          />
        ))}
      </div>
    </div>
  );
}
