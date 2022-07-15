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
          // startTime={props.startTime}
          // setStartTime={props.setStartTime}
          availableTimes={props.availableTimes}
          setAvailableTimes={props.setAvailableTimes}
        />
      ))}
    </div>
  );
}
