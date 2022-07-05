import React, { useState, useEffect } from "react";
import addButton from "../../Shared/assets/AddButton.svg";
import API from "../../../utils/API";

export default function AddTag(props) {
  const [newItem, setNewItem] = useState("");

  // ---- Modify user's dietary profile ----

  const addToLikes = async () => {
    try {
      // add food to likes array and reset state
      props.setData([...props.data, newItem]);
      setNewItem("");
      // update in database
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { food: newItem };
      const res = await API.post("api/v1/auth/dietaryProfile/add", body, config);
      console.log("res: ", res);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
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
        onClick={addToLikes}
      />
    </div>
  );
}
