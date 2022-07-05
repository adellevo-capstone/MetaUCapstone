import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Tag from "./Tag";
import AddTag from "./AddTag";
import editIcon from "../../Shared/assets/EditIcon.svg";
import API from "../../../utils/API";

export default function PreferenceSection(props) {
  const [inEditMode, setEditMode] = useState(false);
  const [revertedData, setRevertedData] = useState(props.data);

  useEffect(() => {
    setRevertedData(props.data);
  }, [inEditMode]);

  const cancelEdits = () => {
    setEditMode(false);
    props.setData(revertedData);
    setRevertedData(props.data);
  };

  const saveEditsToDatabase = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { updatedArray: props.data, sectionType: props.header };
      await API.patch("api/v1/auth/dietaryProfile/add", body, config);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
    setEditMode(false);
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
          {/* {console.log(props.data, inEditMode)} */}
          {props.data.length === 0 && !inEditMode ? (
            <p className="nothing-message">Nothing to see here.</p>
          ) : (
            props.data.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                inEditMode={inEditMode}
                setEditMode={setEditMode}
                sectionType={props.header}
              />
            ))
          )}
          {inEditMode && (
            <AddTag
              inEditMode={inEditMode}
              setEditMode={setEditMode}
              data={props.data}
              setData={props.setData}
              sectionType={props.header}
              // modifiedItems={modifiedItems}
              // setModifiedItems={setModifiedItems}
            />
          )}
        </div>
      </div>
      <div className="edit-actions">
        {inEditMode ? (
          <div>
            {/* <p onClick={() => setEditMode(false)}>Save</p> */}
            <p onClick={() => saveEditsToDatabase()}>Save</p>
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
