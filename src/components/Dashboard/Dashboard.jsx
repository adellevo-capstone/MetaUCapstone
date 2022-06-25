import React, { useState } from "react";
import DietaryProfile from "../DietaryProfile/DietaryProfile";
import Popup from "reactjs-popup";
import "./assets/Dashboard.css";
import Navbar from "./Navbar";

export default function Dashboard(props) {
  return (
    <div className="dashboard">
      <Navbar />
      <DietaryProfile data={props.data} />
    </div>
  );
}
