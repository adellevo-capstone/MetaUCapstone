import React, { useState } from "react";
import profilePicture from "./assets/ProfilePicture.svg";

export default function Header(props) {
  return (
    <div className="section-header">
      <h1>{props.header}</h1>
      <img
        src={profilePicture}
        alt="profiles"
      />
    </div>
  );
}
