import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import AddTag from "./AddTag";
import editIcon from "../../Shared/assets/EditIcon.svg";
import API from "../../../utils/API";
import NoResults from "../../Shared/components/NoResults/NoResults";

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
      console.log(props.data);
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { updatedArray: props.data, sectionType: props.header };
      await API.patch("api/v1/auth/dietaryProfile/modify", body, config);
    } catch (err) {
      console.log(err);
    }
    setEditMode(false);
  };

  return (
    <div className="preference-section">
      <div className="content">
        <div className="section-label">
          <h1>{props.header}</h1>
          <h2>{props.subHeader}</h2>
        </div>
        <div className="tags-container">
          {props.data.length === 0 && !inEditMode ? (
            <NoResults />
          ) : (
            props.data.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                data={props.data}
                setData={props.setData}
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
            />
          )}
        </div>
      </div>
      <div className="edit-actions">
        {inEditMode ? (
          <div>
            <p onClick={saveEditsToDatabase}>Save</p>
            <p onClick={cancelEdits}>Cancel</p>
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
