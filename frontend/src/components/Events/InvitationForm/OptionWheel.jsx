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
    <div className="option-wheel-container">
      {segments.length > 0 ? (
        <>
          {!currentOption.length ? (
            <h2>Spin the wheel to decide on a restaurant.</h2>
          ) : (
            <h2>{currentOption}</h2>
          )}
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
            {winnerPicked ? (
              <div className="wheel-actions">
                <span
                  className="button"
                  onClick={confirmLocation}
                >
                  Confirm
                </span>
                <span
                  className="button"
                  onClick={() =>
                    spinningWheelRef.current.startSpinning(Math.floor(Math.random() * 11) + 3, 8)
                  }
                >
                  Spin again
                </span>
              </div>
            ) : (
              <span
                className="button"
                onClick={() =>
                  spinningWheelRef.current.startSpinning(Math.floor(Math.random() * 11) + 3, 8)
                } // seconds, speed
              >
                Start
              </span>
            )}
          </div>
        </>
      ) : (
        <p>Loading restaurant options...</p>
      )}
    </div>
  );
}
