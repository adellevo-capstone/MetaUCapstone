import React from "react";
// import "./Card.styles.scss";

const Card = ({ passenger, empty }) => {
  return <div className={`card ` + (empty ? "card--empty" : "")}>{passenger}</div>;
};

export default Card;
