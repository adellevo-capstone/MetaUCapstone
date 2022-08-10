import React from "react";
import "./InvitationCard.css";
import Popup from "reactjs-popup";
import deleteButton from "../../Shared/assets/DeleteButton.svg";
import NoResults from "../../Shared/components/NoResults/NoResults";

export default function GuestListPopup({
  guestListOpen,
  closeGuestListModal,
  going,
  notGoing,
  unconfirmed,
}) {
  return (
    <Popup
      open={guestListOpen}
      closeOnDocumentClick
      onClose={closeGuestListModal}
      modal
      nested
      style={{
        backgroundColor: "white",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        padding: "0.5em",
        borderRadius: "2em",
        minWidth: "30em",
        minHeight: "20em",
      }}
    >
      <div className="search-popup">
        <div className="attendance-container">
          <div className="going">
            <span className="attendance-label">Going</span>
            {going?.length > 0 ? (
              <ul>
                {going.map((response, index) => (
                  <li key={index}>{response.name}</li>
                ))}
              </ul>
            ) : (
              <NoResults />
            )}
          </div>
          <div className="not-going">
            <span className="attendance-label">Not going</span>
            {notGoing?.length > 0 ? (
              <ul>
                {notGoing.map((response, index) => (
                  <li key={index}>{response.name}</li>
                ))}
              </ul>
            ) : (
              <NoResults />
            )}
          </div>
          <div className="unconfirmed">
            <span className="attendance-label">Unconfirmed</span>
            {unconfirmed?.length > 0 ? (
              <ul>
                {unconfirmed.map((response, index) => (
                  <li key={index}>{response.name}</li>
                ))}
              </ul>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
        <img
          className="close"
          src={deleteButton}
          onClick={closeGuestListModal}
          alt="delete button"
        />
      </div>
    </Popup>
  );
}
