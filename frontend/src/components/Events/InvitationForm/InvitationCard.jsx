import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import InvitationResponseForm from "./InvitationResponseForm";
import OptionWheel from "./OptionWheel";

export default function InvitationCard(props) {
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

  const deadlinePassed = (rsvpDeadline) => {
    const deadline = new Date(rsvpDeadline);
    const current = Date.now();
    return deadline <= current;
  };

  // const formatDeadline = (rsvpDeadline) => {

  // }

  return (
    <div>
      {/* only display cards when the deadline hasn't passed */}
      {/* {!deadlinePassed(props.event.rsvpDeadline) && ( */}
      <div className="invitation">
        {/* display option wheel for hosts */}
        {!props.guest && deadlinePassed(props.event.rsvpDeadline) && (
          <OptionWheel eventId={props.event._id} />
        )}
        {!deadlinePassed(props.event.rsvpDeadline) && (
          <>
            <div className="left-container">
              <p>Time remaining to RSVP:</p>
              <h2 className="countdown">03 : 23 : 59 : 38</h2>

              <p>This event will be finalized on {props.event.rsvpDeadline}.</p>
            </div>
            <div className="invitation-divider" />
            <div className="right-container">
              <p>Adelle Vo invited you to</p>
              <div className="header">
                <h1>{props.event.title}</h1>
                <p>with {groupName}</p>
              </div>
              <p>{props.event.description}</p>
              <div className="actions">
                <span>View guest list</span>
                <span>Edit RSVP</span>
              </div>
            </div>
          </>
          // <div>
          //   <h3>Members: </h3>
          //   <ul>
          //     <b>Going:</b>
          //     {going?.map((response, index) => (
          //       <li key={index}>{response.name}</li>
          //     ))}
          //   </ul>
          //   <ul>
          //     <b>Not going:</b>
          //     {notGoing?.map((response, index) => (
          //       <li key={index}>{response.name}</li>
          //     ))}
          //   </ul>
          //   <ul>
          //     <b>Unconfirmed:</b>
          //     {unconfirmed?.map((response, index) => (
          //       <li key={index}>{response.name}</li>
          //     ))}
          //   </ul>
          // </div>
        )}
      </div>

      {props.guest && !deadlinePassed(props.event.rsvpDeadline) && (
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
