import React, { useState, useEffect } from "react";
import addButton from "../../Shared/assets/AddButton.svg";
import API from "../../../utils/API";

export default function AddTag(props) {
  const [newItem, setNewItem] = useState("");

  // add food to likes array and reset state
  const addToPreferenceSection = () => {
    props.setData([...props.data, newItem]);
    setNewItem("");
  };

  return (
    <div className="add-tag-container">
      <span className="tag-text">
        <input
          placeholder="New item..."
          onChange={(event) => setNewItem(event.target.value)}
        />
      </span>
      <img
        className="tag-img"
        src={addButton}
        alt="add button"
        onClick={addToPreferenceSection}
      />
    </div>
  );
}
