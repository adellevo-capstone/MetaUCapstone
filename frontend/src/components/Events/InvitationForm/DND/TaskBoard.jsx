import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import CustomDragLayer from "./CustomDragLayer";
import "./TaskBoard.css";
import API from "../../../../utils/API";
import DeleteButton from "../../../Shared/assets/DeleteButton.svg";

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
        currentUserId={props.currentUserId}
      />
    );
  });

  const saveCarpoolGroups = async () => {
    try {
      if (window.confirm("Save carpool group assignment?")) {
        const config = { headers: { "Content-Type": "application/json" } };

        let carpoolData = columns.map((column) => column.props.passengers);
        const passengers = carpoolData[0].passengers;

        let groups = carpoolData.slice(1, carpoolData.length);
        const formattedGroups = groups.map(({ title, ...groups }) => groups);

        const body = {
          groups: formattedGroups,
          passengers: passengers,
        };

        await API.patch(`api/v1/auth/event/${props.eventId}/carpool`, body, config);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="passenger-board">{columns}</div>
      <img
        className="close"
        style={{ marginRight: "1em", marginTop: "1em" }}
        src={DeleteButton}
        onClick={() => {
          saveCarpoolGroups();
          props.closeModal();
        }}
        alt="delete button"
      />
    </DndProvider>
  );
};

export default TaskBoard;
