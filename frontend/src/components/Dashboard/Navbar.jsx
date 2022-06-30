import React, { useState } from "react";
import UserSettings from "./UserSettings";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [selected, setSelected] = useState("Profile");
  const navSections = ["Profile", "Events", "Groups"];

  //   const handleSelected = (event, section) => {
  //     setSelected(section);
  //     console.log(event.currentTarget);
  //     event.currentTarget.classList.toggle("selected");
  //   };

  return (
    <div className="navbar">
      <Link to="/">
        {selected === "Profile" ? (
          <p onClick={() => setSelected("Profile")} className="selected">
            Profile
          </p>
        ) : (
          <p onClick={() => setSelected("Profile")} className="none">
            Profile
          </p>
        )}
      </Link>
      <Link to={"/events"}>
        {selected === "Events" ? (
          <p onClick={() => setSelected("Events")} className="selected">
            Events
          </p>
        ) : (
          <p onClick={() => setSelected("Events")} className="none">
            Events
          </p>
        )}
      </Link>
      <Link to="/groups">
        {selected === "Groups" ? (
          <p onClick={() => setSelected("Groups")} className="selected">
            Groups
          </p>
        ) : (
          <p onClick={() => setSelected("Groups")} className="none">
            Groups
          </p>
        )}
      </Link>
    </div>
  );
}
