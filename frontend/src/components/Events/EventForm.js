import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../utils/API";
import TimeGrid from "./TimeGrid.js";
import Invitation from "./Invitation.js";
import Popup from "reactjs-popup";
import "./EventForm.css";
import InvitationResponse from "./InvitationResponse";

export default function EventForm(props) {
  const [error, setError] = useState("");
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  const [startTime, setStartTime] = useState("00:00");
  const [availableTimes, setAvailableTimes] = useState(new Map());

  useEffect(() => {
    loadAllEvents();
  }, []);

  const loadAllEvents = async () => {
    try {
      const res = await API.get("api/v1/auth/events");
      setHosted(res.data.hosted);
      setInvitedTo(res.data.invitedTo);
    } catch (err) {
      setError(error);
    }
  };

  const createEvent = async (event) => {
    try {
      // get form data
      event.preventDefault();
      const config = { headers: { "Content-Type": "application/json" } };
      const elements = event.currentTarget.elements;

      const intendedGroup = props.groups.find(
        (group) => group.groupInfo._id === elements["group-member-ids"].value
      );

      console.log(elements.title.value);

      const body = {
        groupId: intendedGroup.groupInfo._id,
        members: intendedGroup.groupInfo.members,
        description: elements.description.value,
        title: elements.title.value,
        rsvpDeadline: elements["rsvp-deadline"].value,
        timeSlots: {
          dateMap: Object.fromEntries(availableTimes),
          startTime: startTime,
        },
        priceLevel: elements.priceLevel.value,
        distanceLevel: elements.distanceLevel.value,
        weightedLikes: elements["extra-categories"].value.split(","),
      };

      const res = await API.patch("api/v1/auth/event/create", body, config);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events">
      <Popup
        closeOnDocumentClick
        modal
        nested
        trigger={<button> Create an invitation </button>}
        // style={{
        //   minWidth: "40em",
        // }}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "0.5em",
            borderRadius: "2em",
          }}
        >
          <h2>Create invitation</h2>
          <form onSubmit={(event) => createEvent(event)}>
            <div className="content">
              <div className="planning">
                <fieldset>
                  <legend>Choose a group</legend>
                  <select
                    name="groups"
                    id="group-member-ids"
                    required
                  >
                    {props.groups.map((group) => (
                      <option
                        key={group.groupInfo._id}
                        value={group.groupInfo._id}
                      >
                        {group.groupInfo.name}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <fieldset>
                  <legend>Pick an RSVP deadline</legend>
                  <input
                    id="rsvp-deadline"
                    type="datetime-local"
                    required
                  />
                </fieldset>
                <fieldset className="time-slot-field">
                  <legend>Pick time slots</legend>

                  <TimeGrid
                    startTime={startTime}
                    setStartTime={setStartTime}
                    availableTimes={availableTimes}
                    setAvailableTimes={setAvailableTimes}
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
                  <legend>Title</legend>
                  <textarea id="title" />
                </fieldset>

                <fieldset>
                  <legend>Description</legend>
                  <textarea id="description" />
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
        </div>
      </Popup>

      <div>
        <h2>Events I created</h2>
        {hosted.map((event, index) => (
          <Invitation
            key={index}
            event={event}
          />
        ))}
      </div>
      <div>
        <h2>Events I was invited to</h2>
        {invitedTo.map((event, index) => (
          <InvitationResponse
            key={index}
            event={event}
            createEvent={createEvent}
            groups={props.groups}
            startTime={startTime}
            setStartTime={setStartTime}
            availableTimes={availableTimes}
            setAvailableTimes={setAvailableTimes}
          />
        ))}
      </div>
    </div>
  );
}
