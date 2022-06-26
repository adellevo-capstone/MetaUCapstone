import React, { useState } from "react";
import profilePicture from "../Shared/assets/ProfilePicture.svg";

export default function UserSettings() {
  return (
    <img
      className="user-settings"
      src={profilePicture}
      alt="profile"
    />
  );
}
