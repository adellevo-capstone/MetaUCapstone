import React, { useState, useEffect } from "react";
import TimeGrid from "./TimeGrid/TimeGrid";
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
          eventId: props.event._id,
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

  console.log("rsvpOpen: ", props.rsvpOpen);

  useEffect(() => {
    loadPreviousRSVP();
  }, [props.rsvpOpen]);

  const loadPreviousRSVP = async () => {
    try {
      const res = await API.get(
        `api/v1/auth/inviteResponse/${props.event._id}/${props.currentUser._id}`
      );

      // set previous availability
      let map = new Map();
      let mapData = Object.entries(res.data.availability);
      for (let i = 0; i < mapData.length; i++) {
        map.set(mapData[i][0], mapData[i][1]);
      }
      props.setAvailableTimes(map);

      // set previous price level
      const priceLevel = document.getElementsByName("priceLevel");
      priceLevel[res.data.priceLevel - 1].checked = true;

      // set previous price level
      const distanceLevel = document.getElementsByName("distanceLevel");
      distanceLevel[res.data.distanceLevel - 1].checked = true;

      // set previous transportation
      const transportation = document.getElementById("transportation");
      transportation.value = res.data.carpoolStatus;

      // set additional details if driver status was previously indicated
      if (transportation.value === "driver") {
        const carCapacity = document.getElementById("carCapacity");
        const startingLocation = document.getElementById("startingLocation");
        const carpoolDetails = props.event.carpool.groups.find(
          (group) => group.driver === `${props.currentUser.firstName} ${props.currentUser.lastName}`
        );
        carCapacity.value = carpoolDetails.capacity;
        startingLocation.value = carpoolDetails.startingPoint;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => setRSVPStatus("accept")}>Accept</button>
      <button onClick={() => setRSVPStatus("decline")}>Decline</button>

      <form
        id="rsvp-form"
        onSubmit={(event) => submitRSVP(event)}
      >
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
                  loadPreviousRSVP={loadPreviousRSVP}
                  rsvpStatus={rsvpStatus}
                  rsvpOpen={props.rsvpOpen}
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
                  <div key={index}>
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
                  <div key={index}>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
