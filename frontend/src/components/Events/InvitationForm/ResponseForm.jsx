import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import FormOptions from "./FormOptions/FormOptions.jsx";

export default function ResponseForm(props) {
  const [rsvpStatus, setRSVPStatus] = useState("unconfirmed");
  const [priceLevel, setPriceLevel] = useState(0);
  // const [searchRadius, setSearchRadius] = useState(0);
  const [transportation, setTransportation] = useState("none");
  const [carCapacity, setCarCapacity] = useState(0);
  const [startingPoint, setStartingPoint] = useState("");

  const submitRSVP = async (event) => {
    try {
      // get form data
      event.preventDefault();
      const route = "api/v1/auth/inviteResponse/update";
      const config = { headers: { "Content-Type": "application/json" } };
      // const elements = event.currentTarget.elements;

      const intendedGroup = await props.groups.find(
        (group) => group.groupInfo.name === props.groupName
      );

      let body = {
        eventId: props.event._id,
        attending: rsvpStatus === "accept" ? true : false,
        groupId: intendedGroup.groupInfo._id,
        carpool: {
          status: transportation, // status: elements.transportation.value,
          capacity: carCapacity, // capacity: elements.carCapacity.value,
          startingPoint: startingPoint, // startingPoint: elements.startingLocation.value,
        },
      };

      // console.log(body);
      // console.log(rsvpStatus);

      if (rsvpStatus === "accept") {
        body = {
          ...body,
          availability: Object.fromEntries(props.availableTimes),
          priceLevel: parseInt(priceLevel),
          // distanceLevel: parseInt(searchRadius),
        };
      }

      await API.patch(route, body, config);
      // loadPreviousRSVP();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   loadPreviousRSVP();
  // }, [props.rsvpOpen]);

  const loadPreviousRSVP = async () => {
    try {
      const route = `api/v1/auth/inviteResponse/${props.event._id}/${props.currentUser._id}`;
      const res = await API.get(route);

      // set previous availability (if possible)
      if (res.data.availability) {
        let map = new Map();
        let mapData = Object.entries(res.data.availability);
        for (let i = 0; i < mapData.length; i++) {
          map.set(mapData[i][0], mapData[i][1]);
        }
        props.setAvailableTimes(map);
        console.log(props.availableTimes);
        // set previous price level
        // const priceLevel = document.getElementsByName("priceLevel");
        // priceLevel[res.data.priceLevel - 1].checked = true;
        setPriceLevel(res.data.priceLevel);

        // set previous price level
        // const distanceLevel = document.getElementsByName("distanceLevel");
        // distanceLevel[res.data.distanceLevel - 1].checked = true;
        // setSearchRadius(res.data.distanceLevel);

        // set previous transportation
        // const transportation = document.getElementById("transportation");
        // transportation.value = res.data.carpoolStatus;
        setTransportation(res.data.carpoolStatus);

        // set additional details if driver status was previously indicated
        // if (transportation.value === "driver") {
        //   const carCapacity = document.getElementById("carCapacity");
        //   const startingLocation = document.getElementById("startingLocation");
        //   const carpoolDetails = props.event.carpool.groups.find(
        //     (group) =>
        //       group.driver === `${props.currentUser.firstName} ${props.currentUser.lastName}`
        //   );
        //   carCapacity.value = carpoolDetails.capacity;
        //   startingLocation.value = carpoolDetails.startingPoint;
        // }
        if (res.data.carpoolStatus === "driver") {
          const carpoolDetails = props.event.carpool.groups.find(
            (group) =>
              group.driver === `${props.currentUser.firstName} ${props.currentUser.lastName}`
          );
          setCarCapacity(carpoolDetails.capacity);
          setStartingPoint(carpoolDetails.startingPoint);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormOptions
      {...props}
      header={"Submit RSVP"}
      handleOnSubmit={submitRSVP}
      isGuestResponse={true}
      loadPreviousRSVP={loadPreviousRSVP}
      rsvpStatus={rsvpStatus}
      setRSVPStatus={setRSVPStatus}
      transportation={transportation}
      setTransportation={setTransportation}
      priceLevel={priceLevel}
      setPriceLevel={setPriceLevel}
      carCapacity={carCapacity}
      setCarCapacity={setCarCapacity}
      startingPoint={startingPoint}
      setStartingPoint={setStartingPoint}
      // distance={searchRadius}
      // setDistance={setSearchRadius}
    />
  );
}
