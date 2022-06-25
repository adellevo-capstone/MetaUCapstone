import React, { useState } from "react";
import Tag from "../TagSection/Tag";

export default function TagSection(props) {
  return (
    <div className="profileBar">
      <div className="label">
        <h1>{props.header}</h1>
        <h2>{props.subHeader}</h2>
      </div>
      <div className="tags-container">
        {props.data.map((item) => (
          <Tag
            key={item}
            text={item}
          />
        ))}
      </div>
    </div>
  );
}
