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
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const findUsers = async () => {
    try {
      const filteredUsers = props.allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(props.searchQuery.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

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
              usersToAdd={usersToAdd}
              setUsersToAdd={setUsersToAdd}
              displayedUsers={displayedUsers}
              findUsers={findUsers}
              groups={props.groups}
              loadAllGroups={props.loadAllGroups}
              searchQuery={props.searchQuery}
              setSearchQuery={props.setSearchQuery}
              location={props.location}
              setLocation={props.setLocation}
              loadAllUsers={props.loadAllUsers}
              allUsers={props.allUsers}
              currentUser={props.currentUser}
            />
          }
        />
        <Route
          path="/groups/:name"
          element={
            <GroupDetail
              usersToAdd={usersToAdd}
              setUsersToAdd={setUsersToAdd}
              displayedUsers={displayedUsers}
              findUsers={findUsers}
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
