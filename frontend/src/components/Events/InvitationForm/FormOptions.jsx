import React from "react";
import TimeGrid from "./TimeGrid/TimeGrid.js";
import "./assets/InvitationForm.css";

export default function FormOptions(props) {
  return (
    <div className="invitation-form">
      <h2>{props.header}</h2>
      <form onSubmit={(event) => props.handleOnSubmit(event)}>
        <div className="invitation-form-content">
          <div className="planning">
            {!props.isGuestResponse && (
              <fieldset>
                <legend>Choose a group</legend>
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
              </fieldset>
            )}

            <fieldset className="time-slot-field">
              <legend>Pick time slots</legend>
              {!props.isGuestResponse ? (
                <TimeGrid
                  startTime={props.startTime}
                  setStartTime={props.setStartTime}
                  availableTimes={props.availableTimes}
                  setAvailableTimes={props.setAvailableTimes}
                />
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
            </fieldset>
          </div>

          <div className="filters">
            {!props.isGuestResponse && (
              <>
                <fieldset>
                  <legend>Pick an RSVP deadline</legend>
                  <input
                    id="rsvp-deadline"
                    type="datetime-local"
                    required
                  />
                </fieldset>

                <fieldset>
                  <legend>Title</legend>
                  <textarea
                    id="title"
                    required
                  />
                </fieldset>

                <fieldset>
                  <legend>Description</legend>
                  <textarea
                    id="description"
                    required
                  />
                </fieldset>
              </>
            )}

            <fieldset>
              <legend>Transportation</legend>
              <p>Status</p>
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
                <option value="passenger">Passenger</option>
                <option value="none">N/A</option>
              </select>
              <div>
                <p>How many passengers can you drive?</p>
                <textarea
                  id="carCapacity"
                  required
                />
              </div>
              <div>
                <p>Enter start or pickup location</p>
                <textarea
                  id="startingLocation"
                  required
                />
              </div>
            </fieldset>

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

              <p>Distance level</p>
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
              ))}
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
