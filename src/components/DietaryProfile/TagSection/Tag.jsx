import React, { useState } from "react";
import closeButton from "../assets/DeleteButton.svg";
import Popup from "reactjs-popup";

export default function Tag(props) {
  const [showTag, setShowTag] = useState(true);

  return (
    <div>
      {showTag && (
        <div className="tag-container">
          <span className="tag-text">{props.text}</span>
          {props.inEditMode && (
            <img
              className="tag-img"
              src={closeButton}
              alt="close button"
              onClick={() => setShowTag(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
