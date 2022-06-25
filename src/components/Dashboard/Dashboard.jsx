import React, { useState } from "react";
import DietaryProfile from "../DietaryProfile/DietaryProfile";
import "./assets/Dashboard.css";

export default function Dashboard(props) {
  return (
    <div className="dashboard">
      <DietaryProfile data={props.data} />
    </div>
  );
}
