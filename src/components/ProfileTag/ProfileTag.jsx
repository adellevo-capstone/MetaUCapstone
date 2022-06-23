import React, { useState } from "react";
import closeButton from "./CloseButton.svg";
import "./ProfileTag.css";

export default function ProfileTag({ text }) {
  const [showTag, setShowTag] = useState(true);

  return (
    <div>
      {showTag && (
        <div className="profileTagContainer">
          <span className="tagText">{text}</span>
          <img
            className="tagImg"
            src={closeButton}
            alt="close button"
            onClick={() => setShowTag(false)}
          />
        </div>
      )}
    </div>
  );
}
