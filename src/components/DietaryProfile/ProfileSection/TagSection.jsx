import React, { useState } from "react";
import Popup from "reactjs-popup";
import Tag from "./Tag";
import AddTag from "./AddTag";

export default function TagSection(props) {
  const [inEditMode, setEditMode] = useState(false);
  const [revertedData, setRevertedData] = useState(props.data);

  const cancelEdits = () => {
    setEditMode(false);
    props.setData(revertedData);
    setRevertedData(props.data);
  };

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
        {props.data.length === 0 ? (
          <p>Nothing to see here yet.</p>
        ) : (
          props.data.map((tag) => (
            <Tag
              key={tag}
              text={tag}
              inEditMode={inEditMode}
              setEditMode={setEditMode}
            />
          ))
        )}
        {inEditMode && (
          <AddTag
            inEditMode={inEditMode}
            setEditMode={setEditMode}
            data={props.data}
            setData={props.setData}
          />
        )}
      </div>
      <div className="edit-actions">
        {inEditMode ? (
          <div>
            <p onClick={() => setEditMode(false)}>Save</p>
            <p onClick={() => cancelEdits()}>Cancel</p>
          </div>
        ) : (
          <p onClick={() => setEditMode(true)}>Edit</p>
        )}
      </div>
    </div>
  );
}
