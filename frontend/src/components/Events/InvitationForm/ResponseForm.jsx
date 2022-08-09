import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import FormOptions from "./FormOptions/FormOptions.jsx";
// import { useNavigate } from "react-router-dom";

export default function ResponseForm(props) {
  const [rsvpStatus, setRSVPStatus] = useState("unconfirmed");
  // const navigate = useNavigate();

  const submitRSVP = async (event) => {
    try {
      // get form data
      event.preventDefault();
      // props.closeModal();
      const config = { headers: { "Content-Type": "application/json" } };
      const elements = event.currentTarget.elements;

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
      loadPreviousRSVP();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPreviousRSVP();
  }, [props.rsvpOpen]);

  const loadPreviousRSVP = async () => {
    try {
      const res = await API.get(
        `api/v1/auth/inviteResponse/${props.event._id}/${props.currentUser._id}`
      );

      // set previous availability (if possible)
      if (res.data.availability) {
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
            (group) =>
              group.driver === `${props.currentUser.firstName} ${props.currentUser.lastName}`
          );
          carCapacity.value = carpoolDetails.capacity;
          startingLocation.value = carpoolDetails.startingPoint;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <span
        className="button"
        onClick={() => setRSVPStatus("accept")}
      >
        Accept
      </span>
      <span
        className="button"
        onClick={() => setRSVPStatus("decline")}
      >
        Decline
      </span>

      <FormOptions
        {...props}
        header={"Submit RSVP"}
        handleOnSubmit={submitRSVP}
        isGuestResponse={true}
        loadPreviousRSVP={loadPreviousRSVP}
        rsvpStatus={rsvpStatus}
      />
    </div>
  );
}
