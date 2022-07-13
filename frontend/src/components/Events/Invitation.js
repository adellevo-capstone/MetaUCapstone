import React, { useState, useEffect } from "react";

export default function Invitation(props) {
  const { description } = props.event.eventDetails;
  const groupName = "The Fam";
  const title = "Dinner";
  return (
    <div className="invitation">
      {console.log(props.event)}
      <h2>
        {title} with {groupName}
      </h2>
      <p>{description}</p>
      <h2>{props.rsvpDeadline}</h2>
      <h2>{props.date}</h2>
      {props.event.members.map((member, index) => (
        <p key={index}>{member}</p>
      ))}
    </div>
  );
}
