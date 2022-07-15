import React, { useState, useEffect } from "react";
import TimeGrid from "./TimeGrid/TimeGrid";
import Popup from "reactjs-popup";

export default function InvitationResponseForm(props) {
  const [rsvpStatus, setRSVPStatus] = useState("unconfirmed");

  return (
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
        <div>
          <button onClick={() => setRSVPStatus("accept")}>Accept</button>
          <button onClick={() => setRSVPStatus("decline")}>Decline</button>
          {rsvpStatus === "accept" && (
            <form onClick={() => console.log("placeholder")}>
              <div className="content">
                <div className="planning">
                  <fieldset className="time-slot-field">
                    <legend>Pick time slots</legend>
                    <TimeGrid
                      hostAvailability={props.hostAvailability}
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
      </div>
    </Popup>
  );
}
