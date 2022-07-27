import React from "react";
import { useDrag } from "react-dnd";

export const PassengerCard = ({ id, name }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "passenger",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div
      className="passenger-card"
      ref={dragRef}
    >
      {name}
      {isDragging && "😱"}
    </div>
  );
};
