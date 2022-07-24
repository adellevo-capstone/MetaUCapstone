import React from "react";
import deleteButton from "../../Shared/assets/DeleteButton.svg";

export default function Tag(props) {
  // add food to likes array and reset state
  const deleteFromPreferenceSection = () => {
    const updatedArray = props.data.filter((item) => item !== props.text);
    props.setData(updatedArray);
  };

  return (
    <div>
      <div className="tag-container">
        <span className="tag-text">{props.text}</span>
        {props.inEditMode && (
          <img
            className="tag-img"
            src={deleteButton}
            alt="delete button"
            onClick={deleteFromPreferenceSection}
          />
        )}
      </div>
    </div>
  );
}
