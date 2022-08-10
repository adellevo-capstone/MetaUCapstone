import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import ResponseForm from "./ResponseForm";
import OptionWheel from "./OptionWheel";
import Popup from "reactjs-popup";
import deleteButton from "../../Shared/assets/DeleteButton.svg";
import GuestListPopup from "./GuestListPopup";

export default function InvitationCard(props) {
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    loadUnconfirmedResponses();
    getGroupName();
  }, []);

  const loadUnconfirmedResponses = async () => {
    try {
      const route = `api/v1/auth/inviteResponses/${props.event._id}`;
      const res = await API.get(route);
      setUnconfirmed(res.data.unconfirmed);
    } catch (err) {
      console.log(err);
    }
  };

  const getGroupName = async () => {
    try {
      const route = `api/v1/auth/group/${props.event.groupId}`;
      const res = await API.get(route);
      setGroupName(res.data.groupName);
    } catch (err) {
      console.log(err);
    }
  };

  const deadlinePassed = (rsvpDeadline) => {
    const deadline = new Date(rsvpDeadline);
    const current = Date.now();
    return deadline <= current;
  };

  // Viewing guest list
  const [guestListOpen, setGuestListOpen] = useState(false);
  const closeGuestListModal = () => setGuestListOpen(false);

  // Editing RSVP
  const [rsvpOpen, setRSVPOpen] = useState(false);
  const closeModal = () => setRSVPOpen(false);

  // Date and time formatting
  const date = new Date(props.event.rsvpDeadline).toDateString();
  const formattedDate = `${date.slice(4, date.length - 5)}, ${date.slice(-4)}`;
  const time = new Date(props.event.rsvpDeadline).toLocaleTimeString("en-US");
  const formattedTime = `${time.slice(0, -6)} ${time.slice(-2)}`;

  return (
    <div className="invitation">
      {/* display option wheel for hosts */}
      {!props.guest && deadlinePassed(props.event.rsvpDeadline) && (
        <OptionWheel eventId={props.event._id} />
      )}
      {!deadlinePassed(props.event.rsvpDeadline) && (
        <>
          <div className="left-container">
            {" "}
            <div className="header">
              {props.guest && (
                <p style={{ marginBottom: "1.2em" }}>Hosted by {props.event.hostName}</p>
              )}
              <h1>{props.event.title}</h1>
              <p>{groupName}</p>
            </div>
            <div className="actions">
              {/* View guest list */}
              <span
                className="button"
                onClick={() => setGuestListOpen((o) => !o)}
              >
                View guest list
              </span>

              <GuestListPopup
                guestListOpen={guestListOpen}
                closeGuestListModal={closeGuestListModal}
                eventId={props.event._id}
              />
              {/* Edit RSVP */}
              {props.guest &&
                (unconfirmed
                  .map((person) => person.name)
                  .includes(`${props.currentUser.firstName} ${props.currentUser.lastName}`) ? (
                  <span
                    className="button"
                    onClick={() => setRSVPOpen((o) => !o)}
                  >
                    Submit RSVP
                  </span>
                ) : (
                  <span
                    className="button"
                    onClick={() => setRSVPOpen((o) => !o)}
                  >
                    Edit RSVP
                  </span>
                ))}
              <Popup
                open={rsvpOpen}
                closeOnDocumentClick
                onClose={closeModal}
                modal
                nested
                style={{
                  backgroundColor: "white",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  padding: "0.5em",
                  borderRadius: "2em",
                  minWidth: "20em",
                  minHeight: "20em",
                }}
              >
                <div className="search-popup">
                  <ResponseForm
                    rsvpOpen={rsvpOpen}
                    currentUser={props.currentUser}
                    event={props.event}
                    hostAvailability={props.event.timeSlots.dateMap}
                    groups={props.groups}
                    groupName={groupName}
                    startTime={props.event.timeSlots.startTime}
                    setStartTime={props.setStartTime}
                    availableTimes={props.availableTimes}
                    setAvailableTimes={props.setAvailableTimes}
                    closeModal={closeModal}
                  />
                  <img
                    className="close"
                    src={deleteButton}
                    onClick={closeModal}
                    alt="delete button"
                  />
                </div>
              </Popup>
            </div>
          </div>

          <div
            className="divider"
            style={{ height: "100%", width: "1px", margin: " 1.2em" }}
          />
          <div className="right-container">
            <h3>Event Details</h3>
            <p style={{ marginLeft: "-0.7em" }}>{props.event.description}</p>
            <span>
              RSVP Deadline: {formattedDate} at {formattedTime}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
