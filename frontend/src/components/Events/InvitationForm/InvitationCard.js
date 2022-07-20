import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import "./InvitationCard.css";
import InvitationResponseForm from "./InvitationResponseForm";
// import WheelComponent from "react-wheel-of-prizes";
import SpinningWheel, { SpinningWheelRef, WheelSegment } from "react-spinning-canvas-wheel";

const SEGMENTS = [
  { title: "Metal Gear Solid" },
  { title: "Dark Souls 2" },
  { title: "Escape From Tarkov" },
  { title: "It Takes Two" },
  { title: "Resident Evil Village" },
];

const Wheel = ({ eventId }) => {
  const spinningWheelRef = useRef();
  const [segments, setSegments] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

  // const loadSpinnerOptions = () => {
  //   // const res = await API.get(`api/v1/auth/generateEventDetails/${props.event._id}`);
  //   // const restaurantNames = res.data.options.map((option) => option.name);
  //   // const restaurantNames = ["rubios", "la costa", "panda express", "@bites"];
  //   const restaurantNames = [
  //     { title: "Metal Gear Solid" },
  //     { title: "Dark Souls 2" },
  //     { title: "Escape From Tarkov" },
  //     { title: "It Takes Two" },
  //     { title: "Resident Evil Village" },
  //   ];
  //   setSegments(restaurantNames);
  //   console.log(segments);
  //   // console.log(segments);
  //   // console.log(segments2);
  // };

  const loadSpinnerOptions = async () => {
    const res = await API.get(`api/v1/auth/generateEventDetails/${eventId}`);
    const restaurantNames = res.data.options;

    // console.log(restaurantNames);

    const updatedSegments = restaurantNames.map((option) => {
      return { title: option.name };
    });

    setSegments(updatedSegments);
  };

  return (
    <div>
      {/* startSpinning(secondsToSpin: 4, speed: 4) */}
      <p>{currentOption}</p>
      <button onClick={() => spinningWheelRef.current.startSpinning(30, 4)}>Start</button>
      <button onClick={() => spinningWheelRef.current.stopSpinning()}>Stop</button>
      <div className="spinning-wheel">
        <div className="triangle" />
        <div className="options">
          <SpinningWheel
            size={450}
            segments={segments}
            spinningWheelRef={spinningWheelRef}
            onSegmentChange={(index) => setCurrentOption(segments[index].title)}
            onSpinStart={() => console.log("started")}
            onSpinEnd={(winnerIndex) => console.log("winnerIndex:", winnerIndex)}
          />
        </div>
      </div>

      <button onClick={loadSpinnerOptions}>Get options</button>
    </div>
  );
};

export default function InvitationCard(props) {
  const [going, setGoing] = useState([]);
  const [notGoing, setNotGoing] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    loadInviteResponses();
    getGroupName();
  }, []);

  const loadInviteResponses = async () => {
    try {
      const res = await API.get(`api/v1/auth/inviteResponses/${props.event._id}`);
      setGoing(res.data.going);
      setNotGoing(res.data.notGoing);
      setUnconfirmed(res.data.unconfirmed);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getGroupName = async () => {
    try {
      const res = await API.get(`api/v1/auth/group/${props.event.groupId}`);
      setGroupName(res.data.groupName);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div>
      <Wheel eventId={props.event._id} />
      <div className="invitation">
        <h3>Title: {props.event.title}</h3>
        <p>Group name: {groupName}</p>
        <p>Description: {props.event.eventDetails.description}</p>
        <p>RSVP deadline: {props.event.rsvpDeadline}</p>
        <h3>Members: </h3>
        <ul>
          <b>Going:</b>
          {going?.map((response, index) => (
            <li key={index}>{response.name}</li>
          ))}
        </ul>
        <ul>
          <b>Not going:</b>
          {notGoing?.map((response, index) => (
            <li key={index}>{response.name}</li>
          ))}
        </ul>
        <ul>
          <b>Unconfirmed:</b>
          {unconfirmed?.map((response, index) => (
            <li key={index}>{response.name}</li>
          ))}
        </ul>
        {props.guest && (
          <div>
            <InvitationResponseForm
              eventId={props.event._id}
              hostAvailability={props.event.timeSlots.dateMap}
              groups={props.groups}
              groupName={groupName}
              startTime={props.event.timeSlots.startTime}
              setStartTime={props.setStartTime}
              availableTimes={props.availableTimes}
              setAvailableTimes={props.setAvailableTimes}
            />
          </div>
        )}
      </div>
    </div>
  );
}
