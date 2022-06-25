import React, { useState } from "react";
import DietaryProfile from "../DietaryProfile/DietaryProfile";
import Navbar from "./Navbar";
import "./assets/Dashboard.css";
import "../Shared/assets/Tag.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <DietaryProfile />
    </div>
  );
}
