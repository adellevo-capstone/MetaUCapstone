import React, { useState, useEffect } from "react";
import TimeGrid from "../TimeGrid/TimeGrid.js";
// import "./assets/InvitationForm.css";
import "./FormOptions.css";
import LocationSearchInput from "../LocationSearchInput.jsx";

const GroupSelect = ({ groups }) => (
  <select
    name="groups"
    id="group-member-ids"
    required
  >
    {groups.map((group, index) => (
      <option
        key={index}
        value={group.groupInfo._id}
      >
        {group.groupInfo.name}
      </option>
    ))}
  </select>
);

const RSVPDeadline = () => (
  <input
    id="rsvp-deadline"
    type="datetime-local"
    required
  />
);

const PriceLevel = () => (
  <select
    name="priceLevel"
    id="priceLevel"
    required
    placeholder="e.g. <$10"
  >
    {["<$10", "$11-30", "$31-60", "$61+"].map((label, index) => (
      <option
        key={index}
        value={index + 1}
      >
        {label}
      </option>
    ))}
  </select>
);

const SearchRadius = () => (
  <input
    id="search-radius"
    type="number"
    required
  />
);

export default function FormOptions(props) {
  // const check
  const [transportation, setTransportation] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="invitation-form">
      {/* navigate between event form sections */}
      <div className="page-dots">
        <div
          className={pageNumber === 1 ? "selected" : "unselected"}
          onClick={() => setPageNumber(1)}
        />
        <div
          className={pageNumber === 2 ? "selected" : "unselected"}
          onClick={() => setPageNumber(2)}
        />
        <div
          className={pageNumber === 3 ? "selected" : "unselected"}
          onClick={() => setPageNumber(3)}
        />
      </div>
      <h2>{props.header}</h2>
      <form onSubmit={(event) => props.handleOnSubmit(event)}>
        <div className="invitation-options">
          <div className="filters">
            {!props.isGuestResponse && (
              <div className="form-field">
                <h3>Give your event a title.</h3>
                <input
                  id="title"
                  required
                />
                <h3>Provide some details about the event to give your guests some context.</h3>
                <textarea
                  id="description"
                  required
                />
              </div>
            )}
            <h3>Tell us a little bit more about the event you’re trying to plan.</h3>
            I would like to plan a group outing with <GroupSelect groups={props.groups} />, and I
            want to give everyone until <RSVPDeadline />
            to fill out their RSVP form. I’m looking for a restaurant that’s located within{" "}
            <SearchRadius /> miles of <LocationSearchInput id="restaurant-location" />, and my
            budget is <PriceLevel />.
          </div>

          <div className="form-field">
            {!props.isGuestResponse ? (
              <div>
                <p>Pick time slots</p>
                <TimeGrid
                  startTime={props.startTime}
                  setStartTime={props.setStartTime}
                  availableTimes={props.availableTimes}
                  setAvailableTimes={props.setAvailableTimes}
                />
              </div>
            ) : (
              <TimeGrid
                hostAvailability={props.hostAvailability}
                guest={true}
                startTime={props.startTime}
                setStartTime={props.setStartTime}
                availableTimes={props.availableTimes}
                setAvailableTimes={props.setAvailableTimes}
                loadPreviousRSVP={props.loadPreviousRSVP}
                rsvpStatus={props.rsvpStatus}
                rsvpOpen={props.rsvpOpen}
              />
            )}
          </div>

          <div className="form-field carpool">
            <h3>Let's simplify the process of forming carpool groups.</h3>
            <p>What's your transportation situation?</p>
            <select
              id="transportation"
              selected
              required
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
            >
              <option
                value=""
                disabled
              >
                Select an option
              </option>
              <option value="driver">I can offer a ride.</option>
              <option value="passenger">I need a ride.</option>
              <option value="none">I'm not interested in being part of a carpool group.</option>
            </select>
            {transportation === "driver" && (
              <div>
                <div>
                  <p>How many passengers can you drive?</p>
                  <input
                    id="carCapacity"
                    type="number"
                    required
                  />
                </div>
                <div>
                  <p>
                    Where will you start driving from? (Note: Entering a specific address (e.g. 1604
                    Cracker Lane), as opposed to a general location, will be more helpful for
                    optimizing carpool groups based on distance.)
                  </p>
                  <LocationSearchInput id="guest-starting-location" />
                </div>
              </div>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
