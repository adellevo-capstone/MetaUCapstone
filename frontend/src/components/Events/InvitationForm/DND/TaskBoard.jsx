import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import CustomDragLayer from "./CustomDragLayer";
import "./TaskBoard.css";

const TaskBoard = (props) => {
  const [myPassengers, moveMyPassengers] = useState(props.passengers);

  const handleMoveMyPassenger = (from, to) => {
    const { passenger, columnIndex: fromColumnIndex, index } = from;
    const { columnIndex: toColumnIndex } = to;

    const newMyPassengers = [...myPassengers];
    // remove passenger
    newMyPassengers[fromColumnIndex].passengers.splice(index, 1);
    // move passenger
    newMyPassengers[toColumnIndex].passengers.push(passenger);
    moveMyPassengers(newMyPassengers);
  };

  const columns = myPassengers.map((passengers, columnIndex) => {
    const propsToColumn = { passengers, columnIndex, handleMoveMyPassenger };
    return (
      <Column
        key={`column ${columnIndex}`}
        {...propsToColumn}
      />
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="passenger-board">{columns}</div>
    </DndProvider>
  );
};

export default TaskBoard;
