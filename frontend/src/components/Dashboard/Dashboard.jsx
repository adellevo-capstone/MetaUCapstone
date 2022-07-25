import React, { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import Navbar from "./Navbar";
import "../Shared/assets/Shared.css";
import "./assets/Dashboard.css";
import "../Profile/assets/Profile.css";
import GroupDetail from "../Groups/GroupDetail";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Event from "../Events/Event";
import Groups from "../Groups/Groups";

export default function Dashboard(props) {
  return (
    <div className="dashboard">
      <Navbar />
      <Routes>
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/events"
          element={
            <Event
              groups={props.groups}
              loadAllGroups={props.loadAllGroups}
              currentUser={props.currentUser}
            />
          }
        />
        <Route
          path="/groups"
          element={
            <Groups
              groups={props.groups}
              loadAllGroups={props.loadAllGroups}
              searchQuery={props.searchQuery}
              setSearchQuery={props.setSearchQuery}
              location={props.location}
              setLocation={props.setLocation}
              loadAllUsers={props.loadAllUsers}
              allUsers={props.allUsers}
            />
          }
        />
        <Route
          path="/groups/:name"
          element={
            <GroupDetail
              groups={props.groups}
              loadAllGroups={props.loadAllGroups}
              searchQuery={props.searchQuery}
              setSearchQuery={props.setSearchQuery}
              location={props.location}
              setLocation={props.setLocation}
              loadAllUsers={props.loadAllUsers}
              allUsers={props.allUsers}
            />
          }
        />
      </Routes>
    </div>
  );
}
