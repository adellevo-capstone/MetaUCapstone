import React, { useState } from "react";
import closeButton from "../assets/CloseButton.svg";

export default function Tag(props) {
  const [showTag, setShowTag] = useState(true);

  return (
    <div>
      {showTag && (
        <div className="profile-tag-container">
          <span className="tag-text">{props.text}</span>
          <img
            className="tag-img"
            src={closeButton}
            alt="close button"
            onClick={() => setShowTag(false)}
          />
        </div>
      )}
    </div>
  );
}
