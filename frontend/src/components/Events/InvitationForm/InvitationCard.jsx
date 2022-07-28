import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import InvitationResponseForm from "./InvitationResponseForm";
import OptionWheel from "./OptionWheel";
import Popup from "reactjs-popup";
import deleteButton from "../../Shared/assets/DeleteButton.svg";

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

  // Viewing guest list
  const [guestListOpen, setGuestListOpen] = useState(false);
  const closeGuestListModal = () => setGuestListOpen(false);

  // Editing RSVP
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      {/* only display cards when the deadline hasn't passed */}
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
                {/* View guest list */}
                <span
                  className="button"
                  onClick={() => setGuestListOpen((o) => !o)}
                >
                  View guest list
                </span>
                <Popup
                  open={guestListOpen}
                  closeOnDocumentClick
                  onClose={closeGuestListModal}
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
                  {(close) => (
                    <div className="search-popup">
                      <img
                        className="close"
                        src={deleteButton}
                        onClick={closeGuestListModal}
                        alt="delete button"
                      />
                      <h3>Members: </h3>
                      <ul>
                        <b>Going:</b>
                        {going?.map((response, index) => (
                          <li key={index}>{response.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <b>Not going:</b>
                        {notGoing?.map((response, index) => (
                          <li key={index}>{response.name}</li>
                        ))}
                      </ul>
                      <ul>
                        <b>Unconfirmed:</b>
                        {unconfirmed?.map((response, index) => (
                          <li key={index}>{response.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Popup>
                {/* Edit RSVP */}
                <span
                  className="button"
                  onClick={() => setOpen((o) => !o)}
                >
                  Edit RSVP
                </span>
                <Popup
                  open={open}
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
                  {(close) => (
                    <div className="search-popup">
                      <img
                        className="close"
                        src={deleteButton}
                        onClick={closeModal}
                        alt="delete button"
                      />
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
                </Popup>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
