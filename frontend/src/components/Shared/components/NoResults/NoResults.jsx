import React from "react";
import "./NoResults.css";

export default function NoResults({ message }) {
  const defaultMessage = "Nothing to see here yet.";
  return <span className="no-results">{message ? message : defaultMessage} </span>;
}
