import React, { useState } from "react";
import TimeGrid from "./TimeGrid/TimeGrid.js";
import "./assets/InvitationForm.css";
import LocationSearchInput from "./LocationSearchInput.jsx";

export default function FormOptions(props) {
  // const check
  const [transportation, setTransportation] = useState("");

  return (
    <div className="invitation-form">
      <h2>{props.header}</h2>
      <form onSubmit={(event) => props.handleOnSubmit(event)}>
        <div className="invitation-form-content">
          <div className="planning">
            {/* <fieldset className="time-slot-field"> */}
            {!props.isGuestResponse ? (
              <>
                <div className="form-field">
                  <p>Title</p>
                  <input
                    id="title"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Description</p>
                  <textarea
                    id="description"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Pick an RSVP deadline</p>
                  <input
                    id="rsvp-deadline"
                    type="datetime-local"
                    required
                  />
                </div>
                <div className="form-field">
                  <p>Choose a group</p>
                  <select
                    name="groups"
                    id="group-member-ids"
                    required
                  >
                    {props.groups.map((group, index) => (
                      <option
                        key={index}
                        value={group.groupInfo._id}
                      >
                        {group.groupInfo.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <p>Pick time slots</p>
                  <TimeGrid
                    startTime={props.startTime}
                    setStartTime={props.setStartTime}
                    availableTimes={props.availableTimes}
                    setAvailableTimes={props.setAvailableTimes}
                  />
                </div>
              </>
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
            {/* </fieldset> */}
          </div>

          <div className="filters">
            <legend>Transportation</legend>
            <p>Status</p>
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
                Select carpool needs
              </option>
              <option value="driver">Driver</option>
              <option value="passenger">Passenger</option>
              <option value="none">N/A</option>
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
                  <p>Enter start or pickup location</p>
                  <LocationSearchInput id="guest-starting-location" />
                </div>
              </div>
            )}

            <fieldset>
              {!props.isGuestResponse && (
                <>
                  <legend>Location</legend>
                  <p>Location</p>
                  <textarea
                    id="location"
                    required
                  />
                </>
              )}

              <div>
                <div>
                  <h2>Specify a starting point and a search radius</h2>
                  <p></p>
                  <LocationSearchInput id="restaurant-location" />
                </div>
                <div>
                  <p>
                    This value is an indication of how far you're willing to travel (in miles).{" "}
                  </p>
                  <input
                    id="carCapacity"
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* <h3>Specify a search radius </h3> */}

              {/*<p>Distance level</p>
               {["level-1", "level-2", "level-3", "level-4"].map((label, index) => (
                <div key={index}>
                  <input
                    id={label}
                    name="distanceLevel"
                    type="radio"
                    value={index + 1}
                    required
                  />
                  <label htmlFor={label}>{index + 1}</label>
                </div>
              ))} */}
            </fieldset>

            <fieldset>
              <legend>Price Level</legend>
              {["<$10", "$11-30", "$31-60", "$61+"].map((label, index) => (
                <div key={index}>
                  <input
                    id={label}
                    name="priceLevel"
                    type="radio"
                    value={index + 1}
                    required
                  />
                  <label htmlFor={label}>{label}</label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
