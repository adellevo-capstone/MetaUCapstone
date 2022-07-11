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

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  // const [events, setEvents] = useState({});

  useEffect(() => {
    loadAllGroups();
    // loadAllEvents();
  }, []);

  // const loadAllEvents = async () => {
  //   try {
  //     const res = await API.get("api/v1/auth/events");
  //     setEvents(res.data.events);
  //     console.log(events);
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

  const loadAllGroups = async () => {
    try {
      const res = await API.get("api/v1/auth/group");
      setGroups(res.data.groups);
    } catch (err) {
      console.log(err.response);
    }
  };

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
          element={
            <EventForm
              // events={events}
              // loadAllEvents={loadAllEvents}
              groups={groups}
              loadAllGroups={loadAllGroups}
            />
          }
        />
        <Route
          path="/groups"
          element={
            <Groups
              groups={groups}
              loadAllGroups={loadAllGroups}
            />
          }
        />
      </Routes>
      {/* <Navbar /> */}
    </div>
  );
}
