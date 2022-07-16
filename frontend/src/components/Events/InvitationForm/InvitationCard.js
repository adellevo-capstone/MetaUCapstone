import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import InvitationResponseForm from "./InvitationResponseForm";

export default function InvitationCard(props) {
  const [going, setGoing] = useState([]);
  const [notGoing, setNotGoing] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [groupName, setGroupName] = useState("");
  // const [startTime, setStartTime] = useState("00:00");

  useEffect(() => {
    loadInviteResponses();
    getGroupName();
  }, []);

  const loadInviteResponses = async () => {
    try {
      const res = await API.get(`api/v1/auth/inviteResponses/${props.event._id}`);
      setGoing(res.data.going);
      setNotGoing(res.data.notGoing);
      setUnconfirmed(res.data.unconfirmed);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getGroupName = async () => {
    try {
      const res = await API.get(`api/v1/auth/group/${props.event.groupId}`);
      setGroupName(res.data.groupName);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="invitation">
      <h3>Title: {props.event.title}</h3>
      <p>Group name: {groupName}</p>
      <p>Description: {props.event.eventDetails.description}</p>
      <p>RSVP deadline: {props.event.rsvpDeadline}</p>
      <h3>Members: </h3>
      <ul>
        <b>Going:</b>
        {going?.map((response) => (
          <li>{response.name}</li>
        ))}
      </ul>
      <ul>
        <b>Not going:</b>
        {notGoing?.map((response) => (
          <li>{response.name}</li>
        ))}
      </ul>
      <ul>
        <b>Unconfirmed:</b>
        {unconfirmed?.map((response) => (
          <li>{response.name}</li>
        ))}
      </ul>
      {props.guest && (
        <div>
          <InvitationResponseForm
            eventId={props.event._id}
            hostAvailability={props.event.timeSlots.dateMap}
            groups={props.groups}
            groupName={groupName}
            startTime={props.event.timeSlots.startTime}
            setStartTime={props.setStartTime}
            availableTimes={props.availableTimes}
            setAvailableTimes={props.setAvailableTimes}
          />
        </div>
      )}
    </div>
  );
}
