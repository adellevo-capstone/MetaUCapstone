import React, { useState } from "react";
import closeButton from "../assets/DeleteButton.svg";
import Popup from "reactjs-popup";

export default function Tag(props) {
  const [showTag, setShowTag] = useState(true);

  return (
    <div>
      {showTag && (
        <div className="profile-tag-container">
          <span className="tag-text">{props.text}</span>
          {props.inEditMode && (
            <Popup
              className="delete-popup"
              trigger={
                <img
                  className="tag-img"
                  src={closeButton}
                  alt="close button"
                  // onClick={() => setShowTag(false)}
                />
              }
              position="right center"
            >
              <div>
                <p>
                  Remove{" "}
                  <b>
                    <i>"{props.text}"</i>
                  </b>
                  from {props.section}?
                </p>
                <button onClick={() => setShowTag(true)}>Cancel </button>
                <button onClick={() => setShowTag(false)}>Confirm </button>
              </div>
            </Popup>
          )}
        </div>
      )}
    </div>
  );
}
