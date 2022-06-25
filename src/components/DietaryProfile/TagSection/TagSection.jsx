import React, { useState } from "react";
import Popup from "reactjs-popup";
import Tag from "../TagSection/Tag";

export default function TagSection(props) {
  const [inEditMode, setEditMode] = useState(false);

  return (
    <div className="profile-section">
      <div className="label">
        <h1>{props.header}</h1>
        <h2>{props.subHeader}</h2>
        <Popup
          trigger={<h2>Discover similar</h2>}
          position="right center"
        >
          <div>blah</div>
        </Popup>
      </div>
      <div className="tags-container">
        {props.data.map((item) => (
          <Tag
            key={item}
            text={item}
            inEditMode={inEditMode}
            setEditMode={setEditMode}
          />
        ))}
      </div>
      {inEditMode ? (
        <div>
          <h2 onClick={() => setEditMode(false)}>Save</h2>
          <h2 onClick={() => setEditMode(false)}>Cancel</h2>
        </div>
      ) : (
        <h2 onClick={() => setEditMode(true)}>Edit</h2>
      )}
    </div>
  );
}
