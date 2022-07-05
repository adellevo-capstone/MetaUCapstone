import React, { useState } from "react";
import Profile from "../Profile/Profile";
import Navbar from "./Navbar";
import "../Shared/assets/Shared.css";
import "./assets/Dashboard.css";
import "../Profile/assets/Profile.css";
import UserSettings from "./UserSettings";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EventForm from "../Events/EventForm";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="actions">
        <Navbar />
        <UserSettings />
      </div>
      <Routes>
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/events"
          element={<EventForm />}
        />
        {/* <Route
          path="/groups"
          element={<Groups />}
        /> */}
      </Routes>
      {/* <Navbar /> */}
    </div>
  );
}
