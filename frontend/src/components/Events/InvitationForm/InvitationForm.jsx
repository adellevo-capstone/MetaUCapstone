import React from "react";
import API from "../../../utils/API.js";
import FormOptions from "./FormOptions.jsx";
import "./assets/InvitationForm.css";

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
        title: elements.title.value,
        groupId: intendedGroup.groupInfo._id,
        description: elements.description.value,
        location: elements.location.value,
        rsvpDeadline: elements["rsvp-deadline"].value,
        timeSlots: {
          dateMap: Object.fromEntries(props.availableTimes),
          startTime: props.startTime,
        },
        carpool: {
          status: elements.transportation.value,
          capacity: elements.carCapacity.value,
          startingPoint: elements.startingLocation.value,
        },
        members: intendedGroup.groupInfo.members,
        priceLevel: parseInt(elements.priceLevel.value),
        distanceLevel: parseInt(elements.distanceLevel.value),
      };
      await API.patch("api/v1/auth/event/create", body, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormOptions
      {...props}
      header={"Create invitation"}
      handleOnSubmit={createEvent}
      isGuestResponse={false}
    />
  );
}
