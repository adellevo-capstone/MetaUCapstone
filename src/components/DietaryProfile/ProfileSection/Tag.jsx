import React, { useState } from "react";
import deleteButton from "../../Shared/assets/DeleteButton.svg";

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
              src={deleteButton}
              alt="delete button"
              onClick={() => setShowTag(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
