import React, { useState } from "react";
import API from "../../../utils/API.js";
import FormOptions from "./FormOptions/FormOptions.jsx";
import "./assets/InvitationForm.css";

export default function InvitationForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [rsvpDeadline, setRsvpDeadline] = useState("");
  const [transportation, setTransportation] = useState("driver");
  const [carCapacity, setCarCapacity] = useState(0);
  const [startingPoint, setStartingPoint] = useState("");
  const [priceLevel, setPriceLevel] = useState(0);
  const [searchRadius, setSearchRadius] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("");

  const createEvent = async (event) => {
    try {
      event.preventDefault();
      const route = "api/v1/auth/event/create";
      const config = { headers: { "Content-Type": "application/json" } };
      const intendedGroup = props.groups.find((group) => group.groupInfo._id === selectedGroup);

      const body = {
        title: title,
        groupId: intendedGroup.groupInfo._id,
        description: description,
        location: restaurantLocation,
        rsvpDeadline: rsvpDeadline,
        timeSlots: {
          dateMap: Object.fromEntries(props.availableTimes),
          startTime: props.startTime,
        },
        carpool: {
          status: transportation,
          capacity: carCapacity,
          startingPoint: startingPoint,
        },
        members: intendedGroup.groupInfo.members,
        priceLevel: parseInt(priceLevel),
        distanceLevel: parseInt(searchRadius),
      };

      await API.patch(route, body, config);
      props.closeModal();
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
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      restaurantLocation={restaurantLocation}
      setRestaurantLocation={setRestaurantLocation}
      rsvpDeadline={rsvpDeadline}
      setRsvpDeadline={setRsvpDeadline}
      transportation={transportation}
      setTransportation={setTransportation}
      carCapacity={carCapacity}
      setCarCapacity={setCarCapacity}
      startingPoint={startingPoint}
      setStartingPoint={setStartingPoint}
      priceLevel={priceLevel}
      setPriceLevel={setPriceLevel}
      searchRadius={searchRadius}
      setSearchRadius={setSearchRadius}
      selectedGroup={selectedGroup}
      setSelectedGroup={setSelectedGroup}
    />
  );
}
