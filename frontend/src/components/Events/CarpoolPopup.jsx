import React from "react";
import Popup from "reactjs-popup";
import TaskBoard from "./InvitationForm/DND/TaskBoard";
import "./Event.css";

export default function CarpoolPopup({
  openCarpool,
  closeCarpoolModal,
  selectedEvent,
  currentUser,
  passengers,
}) {
  return (
    <Popup
      open={openCarpool}
      closeOnDocumentClick
      onClose={closeCarpoolModal}
      modal
      nested
    >
      {/* <DndProvider backend={HTML5Backend}> */}
      <div className="carpool-details">
        <TaskBoard
          eventId={selectedEvent._id}
          currentUserId={currentUser._id}
          passengers={passengers}
          closeModal={closeCarpoolModal}
        />
      </div>
      {/* </DndProvider> */}
    </Popup>
  );
}
