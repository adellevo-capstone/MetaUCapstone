import React, { useState, useEffect, useRef } from "react";
import API from "../../../utils/API";
import SpinningWheel, { SpinningWheelRef, WheelSegment } from "react-spinning-canvas-wheel";

export default function OptionWheel({ eventId }) {
  const spinningWheelRef = useRef();
  const [segments, setSegments] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [time, setTime] = useState("");
  const [winnerPicked, setWinnerPicked] = useState(false);

  const loadSpinnerOptions = async () => {
    const res = await API.get(`api/v1/auth/generateEventDetails/${eventId}`);
    const restaurantNames = res.data.options;
    const updatedSegments = restaurantNames.map((option) => {
      return { title: option.name };
    });

    setSegments(updatedSegments);
  };

  const confirmLocation = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = {
        restaurant: currentOption,
      };
      await API.patch(`api/v1/auth/event/${eventId}/update`, body, config);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSpinnerOptions();
  }, []);

  return (
    <div>
      <p>{currentOption}</p>

      <div className="spinning-wheel">
        <div className="triangle" />
        <div className="options">
          <SpinningWheel
            size={450}
            segments={segments}
            spinningWheelRef={spinningWheelRef}
            onSegmentChange={(index) => setCurrentOption(segments[index].title)}
            onSpinStart={() => setWinnerPicked(false)}
            onSpinEnd={() => setWinnerPicked(true)}
          />
        </div>
      </div>

      {winnerPicked ? (
        <span
          className="button"
          onClick={confirmLocation}
        >
          Confirm location
        </span>
      ) : (
        <span
          className="button"
          onClick={() => spinningWheelRef.current.startSpinning(20, 2)}
        >
          Start
        </span>
      )}
    </div>
  );
}
