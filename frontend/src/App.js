import { React, useState, useEffect } from "react";
import Auth from "./components/AuthPage/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import API from "./utils/API";
import "./components/Dashboard/assets/Dashboard.css";
import "./components/Shared/assets/Shared.css";
import "./components/Profile/assets/Profile.css";
import "./components/AuthPage/Auth.css";
import "./App.css";

export default function App() {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUserInfo();
    loadAllGroups();
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const res = await API.get("api/v1/auth/allUsers");
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const res = await API.get("api/v1/auth/user");
      setCurrentUser(res.data.user);
    } catch (err) {
      console.log(err.response);
    }
  };

  const loadAllGroups = async () => {
    try {
      const res = await API.get("api/v1/auth/group");
      setGroups(res.data.groups);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <div className="dashboard">
            {/* <div className="right-container"> */}
            <Routes>
              <Route
                path="/"
                element={<Auth />}
              />
              <Route
                path="/dashboard/*"
                element={
                  <Dashboard
                    groups={groups}
                    loadAllGroups={loadAllGroups}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    location={location}
                    setLocation={setLocation}
                    loadAllUsers={loadAllUsers}
                    allUsers={allUsers}
                    currentUser={currentUser}
                  />
                }
              />
            </Routes>
            {/* </div> */}
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}
