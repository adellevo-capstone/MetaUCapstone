import React, { useState } from "react";
import Profile from "../Profile/Profile";
import Navbar from "./Navbar";
// import "./Shared/assets/Shared.css";
// import "./assets/Dashboard.css";
// import "./Profile/assets/Profile.css";
import UserSettings from "./UserSettings";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="actions">
        <Navbar />
        <UserSettings />
      </div>
      <Profile />
      {/* <Navbar /> */}
    </div>
  );
}
