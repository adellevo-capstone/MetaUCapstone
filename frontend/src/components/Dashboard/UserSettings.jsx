import React, { useState } from "react";
import profilePicture from "../Shared/assets/ProfilePicture.svg";
import API from "../../utils/API";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await API.get("api/v1/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <img
      className="user-settings"
      src={profilePicture}
      alt="profile"
      onClick={() => logoutUser()}
    />
  );
}
