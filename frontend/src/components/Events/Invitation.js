import React, { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import Navbar from "./Navbar";
import "../Shared/assets/Shared.css";
import "./assets/Dashboard.css";
import "../Profile/assets/Profile.css";
import UserSettings from "./UserSettings";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventForm from "../Events/EventForm";
import Groups from "../Groups/Groups";
import API from "../../utils/API";

export default function Invitation(props) {
  return (
    <div className="invitation">
      <h2>{props.name}</h2>
      <h2>{props.rsvpDeadline}</h2>
      {/* <h2>{props.date}</h2> */}
    </div>
  );
}
