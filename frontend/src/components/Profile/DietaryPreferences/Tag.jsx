import React, { useState } from "react";
import deleteButton from "../../Shared/assets/DeleteButton.svg";
import API from "../../../utils/API";

export default function Tag(props) {
  const [showTag, setShowTag] = useState(true);

  // ---- Modify user's dietary profile ----

  const deleteFromLikes = async () => {
    try {
      // remove food from likes array and reset state
      setShowTag(false);
      // update in database
      const config = { headers: { "Content-Type": "application/json" } };
      const body = { food: props.text, sectionType: props.sectionType };
      const res = await API.patch("api/v1/auth/dietaryProfile/delete", body, config);
      console.log("res: ", res);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <div>
      {showTag && (
        <div className="tag-container">
          <span className="tag-text">{props.text}</span>
          {props.inEditMode && (
            <img
              className="tag-img"
              src={deleteButton}
              alt="delete button"
              // onClick={() => setShowTag(false)}
              onClick={deleteFromLikes}
            />
          )}
        </div>
      )}
    </div>
  );
}
