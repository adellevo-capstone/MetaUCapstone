import React from "react";
import API from "../../../utils/API.js";
import TimeGrid from "./TimeGrid/TimeGrid.js";

export default function InvitationForm(props) {
  const createEvent = async (event) => {
    try {
      // get form data
      event.preventDefault();
      const config = { headers: { "Content-Type": "application/json" } };
      const elements = event.currentTarget.elements;

      const intendedGroup = props.groups.find(
        (group) => group.groupInfo._id === elements["group-member-ids"].value
      );

      const body = {
        groupId: intendedGroup.groupInfo._id,
        members: intendedGroup.groupInfo.members,
        description: elements.description.value,
        title: elements.title.value,
        rsvpDeadline: elements["rsvp-deadline"].value,
        timeSlots: {
          dateMap: Object.fromEntries(props.availableTimes),
          startTime: props.startTime,
        },
        priceLevel: parseInt(elements.priceLevel.value),
        distanceLevel: parseInt(elements.distanceLevel.value),
      };

      await API.patch("api/v1/auth/event/create", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
                startTime={props.startTime}
                setStartTime={props.setStartTime}
                availableTimes={props.availableTimes}
                setAvailableTimes={props.setAvailableTimes}
              />
            </fieldset>
          </div>

          <div className="filters">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
