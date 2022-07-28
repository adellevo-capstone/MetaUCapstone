import React, { useState, useEffect } from "react";
import InvitationCard from "../InvitationForm/InvitationCard";

export default function EventsInvitedTo(props) {
  return (
    <div>
      <h2>Events I was invited to</h2>
      {props.invitedTo.map((event, index) => (
        <InvitationCard
          guest={true}
          key={index}
          event={event}
          groups={props.groups}
          availableTimes={props.availableTimes}
          setAvailableTimes={props.setAvailableTimes}
        />
      ))}
    </div>
  );
}
