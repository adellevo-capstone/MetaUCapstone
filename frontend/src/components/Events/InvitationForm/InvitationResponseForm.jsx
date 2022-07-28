import React, { useState } from "react";
import TimeGrid from "./TimeGrid/TimeGrid";
import Popup from "reactjs-popup";
import API from "../../../utils/API";

export default function InvitationResponseForm(props) {
  const [rsvpStatus, setRSVPStatus] = useState("unconfirmed");

  const submitRSVP = async (event) => {
    try {
      // get form data
      event.preventDefault();
      const config = { headers: { "Content-Type": "application/json" } };
      const elements = event.currentTarget.elements;

      console.log(props.groups);
      const intendedGroup = await props.groups.find(
        (group) => group.groupInfo.name === props.groupName
      );

      let body = {
        attending: rsvpStatus === "accept" ? true : false,
        groupId: intendedGroup.groupInfo._id,
      };

      if (rsvpStatus === "accept") {
        body = {
          ...body,
          eventId: props.eventId,
          priceLevel: parseInt(elements.priceLevel.value),
          distanceLevel: parseInt(elements.distanceLevel.value),
          availability: Object.fromEntries(props.availableTimes),
          carpool: {
            status: elements.transportation.value,
            capacity: elements.carCapacity.value,
            startingPoint: elements.startingLocation.value,
          },
        };
      }

      await API.patch("api/v1/auth/inviteResponse/update", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => setRSVPStatus("accept")}>Accept</button>
      <button onClick={() => setRSVPStatus("decline")}>Decline</button>

      <form onSubmit={(event) => submitRSVP(event)}>
        {rsvpStatus === "accept" && (
          <>
            {" "}
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
                    <option value="passenger">Passenger</option>
                    <option value="none">N/A</option>
                  </select>
                  <div>
                    <p style={{ width: "20em" }}>How many passengers can you drive?</p>
                    <textarea id="carCapacity" />
                  </div>
                  <div>
                    <p style={{ width: "20em" }}>Enter start or pickup location</p>
                    <textarea id="startingLocation" />
                  </div>
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
                        value={index + 1}
                        required
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
                        value={index + 1}
                        required
                      />
                      <label htmlFor={label}>{index + 1}</label>
                    </div>
                  ))}
                </fieldset>
              </div>
            </div>
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
