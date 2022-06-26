import React, { useState } from "react";
import Popup from "reactjs-popup";
import Tag from "./Tag";
import AddTag from "./AddTag";
import editIcon from "../../Shared/assets/EditIcon.svg";

export default function PreferenceSection(props) {
  const [inEditMode, setEditMode] = useState(false);
  const [revertedData, setRevertedData] = useState(props.data);

  const cancelEdits = () => {
    setEditMode(false);
    props.setData(revertedData);
    setRevertedData(props.data);
  };

  return (
    <div className="preference-section">
      <div className="content">
        <div className="section-label">
          <h1>{props.header}</h1>
          <h2>{props.subHeader}</h2>
          {/* <Popup
          trigger={<h2>Discover similar</h2>}
          position="right center"
        >
          <div>blah</div>
        </Popup> */}
        </div>
        <div className="tags-container">
          {props.data.length === 0 ? (
            <p className="nothing-message">Nothing to see here.</p>
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
      </div>
      <div className="edit-actions">
        {inEditMode ? (
          <div>
            <p onClick={() => setEditMode(false)}>Save</p>
            <p onClick={() => cancelEdits()}>Cancel</p>
          </div>
        ) : (
          <p onClick={() => setEditMode(true)}>
            <img
              src={editIcon}
              alt="edit icon"
            />
          </p>
        )}
      </div>
    </div>
  );
}
