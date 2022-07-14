import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./Invitation.css";

export default function Invitation(props) {
  const [going, setGoing] = useState([]);
  const [notGoing, setNotGoing] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [groupName, setGroupName] = useState("");

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
    </div>
  );
}
