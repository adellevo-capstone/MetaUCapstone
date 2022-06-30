import React, { useState, useTransition } from "react";
import addButton from "../../Shared/assets/DeleteButton.svg";
import Popup from "reactjs-popup";

export default function AddTag(props) {
  const [newItem, setNewItem] = useState("");

  const handleClick = () => {
    console.log(newItem);
    props.setData([...props.data, newItem]);
    // console.log(props.data);
    // setNewItem("");
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
        onClick={() => handleClick()}
      />
    </div>
  );
}
