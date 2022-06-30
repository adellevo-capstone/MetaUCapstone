import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import EventForm from "./components/Events/EventForm";
import Navbar from "./components/Dashboard/Navbar";
import UserSettings from "./components/Dashboard/UserSettings";
import Profile from "./components/Profile/Profile";
import "./components/Dashboard/assets/Dashboard.css";
import "./components/Shared/assets/Shared.css";
import "./components/Profile/assets/Profile.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <div className="dashboard">
            <div className="right-container">
              <div className="actions">
                <Navbar />
                <UserSettings />
              </div>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/events" element={<EventForm />} />
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
