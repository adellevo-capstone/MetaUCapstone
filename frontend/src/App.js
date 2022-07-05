import { React, useState } from "react";
import Auth from "./components/AuthPage/Auth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "./components/Dashboard/assets/Dashboard.css";
import "./components/Shared/assets/Shared.css";
import "./components/Profile/assets/Profile.css";
import "./components/AuthPage/Auth.css";
import "./App.css";

function App() {
  // const [authorized, setAuthorized] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <div className="dashboard">
            <div className="right-container">
              <Routes>
                <Route
                  path="/"
                  element={<Auth />}
                />
                <Route
                  path="/dashboard/*"
                  element={<Dashboard />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
