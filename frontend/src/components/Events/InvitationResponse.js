import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./Invitation.css";
import Popup from "reactjs-popup";
import TimeGrid from "./TimeGrid";
import ResponseTimeGrid from "./ResponseTimeGrid";

export default function InvitationResponse(props) {
  const [going, setGoing] = useState([]);
  const [notGoing, setNotGoing] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [rsvpStatus, setRSVPStatus] = useState("unconfirmed");

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
      <Popup
        closeOnDocumentClick
        modal
        nested
        trigger={<button> Fill out RSVP </button>}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "0.5em",
            borderRadius: "2em",
          }}
        >
          <button onClick={() => setRSVPStatus("accept")}>Accept</button>
          <button onClick={() => setRSVPStatus("decline")}>Decline</button>
          {rsvpStatus === "accept" && (
            <form>
              <div className="content">
                <div className="planning">
                  <fieldset className="time-slot-field">
                    <legend>Pick time slots</legend>
                    <TimeGrid
                      guest={true}
                      startTime={props.startTime}
                      setStartTime={props.setStartTime}
                      availableTimes={props.availableTimes}
                      setAvailableTimes={props.setAvailableTimes}
                    />
                  </fieldset>
                </div>

                <div className="filters">
                  <fieldset>
                    <legend>Extra categories</legend>
                    <input
                      id="extra-categories"
                      type="text"
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <legend>Transportation</legend>
                    <select
                      id="transportation"
                      selected
                      required
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select carpool needs
                      </option>
                      <option value="driver">Driver</option>
                      <option value="rider">Rider</option>
                      <option value="none">N/A</option>
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend>Price Level</legend>
                    {["<$10", "$11-30", "$31-60", "$61+"].map((label, index) => (
                      <div>
                        <input
                          key={index}
                          id={label}
                          name="priceLevel"
                          type="radio"
                          value={index}
                        />
                        <label htmlFor={label}>{label}</label>
                      </div>
                    ))}
                  </fieldset>

                  <fieldset>
                    <legend>Distance</legend>
                    {["level-1", "level-2", "level-3", "level-4"].map((label, index) => (
                      <div>
                        <input
                          key={index}
                          id={label}
                          name="distanceLevel"
                          type="radio"
                          value={index}
                        />
                        <label htmlFor={label}>{index + 1}</label>
                      </div>
                    ))}
                  </fieldset>
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </Popup>
    </div>
  );
}
