import React, { useState } from "react";

export default function Navbar() {
  const [selected, setSelected] = useState("Dietary Profile");
  const navSections = ["Dietary Profile", "My Events", "My Groups"];

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
            <h2
              onClick={() => setSelected(section)}
              className="selected"
            >
              {section}
            </h2>
          ) : (
            <h2
              onClick={() => setSelected(section)}
              className="none"
            >
              {section}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
}
