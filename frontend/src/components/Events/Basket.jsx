import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { PassengerCard } from "./PassengerCard";

export const Basket = (props) => {
  const [carpoolGroups, setCarpoolGroups] = useState(props.carpoolData);
  const [{ isOver }, dropRef] = useDrop({
    accept: "passenger",
    drop: (item) =>
      setCarpoolGroups((groups) => {
        const groupIndex = 0;
        let updatedGroups = groups;
        let passengers = updatedGroups[groupIndex].passengers;

        // prevent duplicates
        const passengerNames = passengers.map((passenger) => passenger.name);
        if (!passengerNames.includes(item.name)) {
          passengers.push(item);
        }

        return updatedGroups;
      }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <React.Fragment>
      <div
        className="passengers"
        style={{ border: "1px solid black" }}
      >
        {props.passengers.map((passenger) => (
          <PassengerCard
            draggable
            name={passenger.name}
          />
        ))}
      </div>
      {carpoolGroups.map((group, index) => (
        <div
          key={index}
          className="basket"
          ref={dropRef}
          style={{ border: "1px solid blue", minWidth: "30em" }}
        >
          <h2>{group?.driver.name}</h2>
          {group?.passengers.map((passenger) => (
            <PassengerCard name={passenger.name} />
          ))}
          {isOver && <div>Drop Here!</div>}
        </div>
      ))}
    </React.Fragment>
  );
};
