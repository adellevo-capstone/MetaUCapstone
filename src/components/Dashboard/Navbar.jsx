import React, { useState } from "react";
import UserSettings from "./UserSettings";

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
      {navSections.map((section) => (
        <div key={section}>
          {selected === section ? (
            <p
              onClick={() => setSelected(section)}
              className="selected"
            >
              {section}
            </p>
          ) : (
            <p
              onClick={() => setSelected(section)}
              className="none"
            >
              {section}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
