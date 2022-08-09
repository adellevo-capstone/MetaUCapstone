import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import ResponseForm from "./ResponseForm";
import OptionWheel from "./OptionWheel";
import Popup from "reactjs-popup";
import deleteButton from "../../Shared/assets/DeleteButton.svg";
import NoResults from "../../Shared/components/NoResults/NoResults";

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
                  minWidth: "30em",
                  minHeight: "20em",
                }}
              >
                {(close) => (
                  <div className="search-popup">
                    <div className="attendance-container">
                      <div className="going">
                        <span className="attendance-label">Going</span>
                        {going?.length > 0 ? (
                          <ul>
                            {going.map((response, index) => (
                              <li key={index}>{response.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <NoResults />
                        )}
                      </div>
                      <div className="not-going">
                        <span className="attendance-label">Not going</span>
                        {notGoing?.length > 0 ? (
                          <ul>
                            {notGoing.map((response, index) => (
                              <li key={index}>{response.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <NoResults />
                        )}
                      </div>
                      <div className="unconfirmed">
                        <span className="attendance-label">Unconfirmed</span>
                        {unconfirmed?.length > 0 ? (
                          <ul>
                            {unconfirmed.map((response, index) => (
                              <li key={index}>{response.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <NoResults />
                        )}
                      </div>
                      <img
                        className="close"
                        src={deleteButton}
                        onClick={closeGuestListModal}
                        alt="delete button"
                      />
                    </div>
                  </div>
                )}
              </Popup>
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
                {(close) => (
                  <div className="search-popup">
                    <img
                      className="close"
                      src={deleteButton}
                      onClick={closeModal}
                      alt="delete button"
                    />
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
                  </div>
                )}
              </Popup>
            </div>
          </div>

          <div
            className="divider"
            style={{ height: "100%", width: "1px" }}
          />
          <div className="right-container">
            {props.guest && <p>{props.event.hostId} invited you to</p>}

            <span>
              RSVP Deadline: {formattedDate} at {formattedTime}
            </span>
            <p>{props.event.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
