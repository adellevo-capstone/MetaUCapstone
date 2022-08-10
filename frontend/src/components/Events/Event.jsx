import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import NoResults from "../Shared/components/NoResults/NoResults";
import CarpoolPopup from "./CarpoolPopup";
import GuestListPopup from "./InvitationForm/GuestListPopup";
import InvitationForm from "./InvitationForm/InvitationForm";
import InvitationCard from "./InvitationForm/InvitationCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import map from "../Shared/assets/Map.svg";
import car from "../Shared/assets/Car.svg";
import people from "../Shared/assets/People.svg";
import DeleteButton from "../Shared/assets/DeleteButton.svg";
import "./Event.css";

export default function Event(props) {
  const [error, setError] = useState("");
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  const [startTime, setStartTime] = useState("00:00");
  const [availableTimes, setAvailableTimes] = useState(new Map());
  const [selectedEvent, setSelectedEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);

  /* ---- begin: selected event ---- */

  const [going, setGoing] = useState([]);
  const [notGoing, setNotGoing] = useState([]);
  const [unconfirmed, setUnconfirmed] = useState([]);

  const [openGuestList, setGuestListOpen] = useState(false);
  const closeGuestListModal = () => setGuestListOpen(false);

  const loadInviteResponses = async () => {
    try {
      const route = `api/v1/auth/inviteResponses/${selectedEvent._id}`;
      const res = await API.get(route);
      setGoing(res.data.going);
      setNotGoing(res.data.notGoing);
      setUnconfirmed(res.data.unconfirmed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadInviteResponses();
  }, [selectedEvent]);

  /* ---- end: selected event ---- */

  let passengers = [];
  if (Object.keys(selectedEvent).length > 0) {
    passengers.push({
      title: "Passengers",
      passengers: selectedEvent?.carpool?.passengers,
    });
    const carpoolData = selectedEvent?.carpool?.groups;
    for (let i = 0; i < carpoolData.length; i++) {
      passengers.push({
        ...carpoolData[i],
        title: carpoolData[i].driver,
        passengers: carpoolData[i].passengers,
      });
    }
  }

  const loadAllEvents = async () => {
    try {
      const route = "api/v1/auth/events";
      const res = await API.get(route);
      setHosted(res.data.hosted);
      setInvitedTo(res.data.invitedTo);

      const events = [...res.data.hosted, ...res.data.invitedTo];
      const reformattedEvents = events.map((item) => ({
        start: `${item.date}T${item.time}`,
        ...item,
      }));

      setAllEvents(reformattedEvents);
    } catch (err) {
      setError(error);
    }
  };

  const handleEventClick = async (clickInfo) => {
    try {
      const originalEvent = allEvents.find((e) => e._id === clickInfo.event.extendedProps._id);
      const res = await API.get(`api/v1/auth/groupName/${originalEvent._id}`);
      const newEvent = { ...originalEvent, groupName: res.data.name };
      setSelectedEvent(newEvent);
    } catch (err) {
      setError(error);
    }
  };

  const sendText = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      // get restaurant details
      const res = await API.post(
        "api/v1/auth/restaurantInfo",
        { location: selectedEvent.location, searchQuery: selectedEvent.restaurant },
        config
      );

      // get address
      const { display_address } = res.data[0].location;
      const address = display_address.join(", ");
      await API.post("api/v1/auth/sendText", { address: address }, config);
      alert("Address sent! Check your texts to find it.");
    } catch (err) {
      setError(error);
    }
  };

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    loadAllEvents();
  }, [open]);

  const [selectedEventType, setSelectedEventType] = useState("Hosted");
  const [hostedClass, setHostedClass] = useState("selected");
  const [invitedToClass, setInvitedToClass] = useState("unselected");

  const deadlinePassed = (rsvpDeadline) => {
    const deadline = new Date(rsvpDeadline);
    const current = Date.now();
    return deadline <= current;
  };

  const [openCarpool, setCarpoolOpen] = useState(false);
  const closeCarpoolModal = () => setCarpoolOpen(false);

  return (
    <div className="events">
      <div className="first-section">
        <div className=" event-section-header">
          <h1>Calendar</h1>
          <div>
            <span
              className="button"
              onClick={() => setOpen((o) => !o)}
            >
              Create an event
            </span>
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
              modal
              nested
            >
              <div className="event-popup">
                <InvitationForm
                  groups={props.groups}
                  startTime={startTime}
                  setStartTime={setStartTime}
                  availableTimes={availableTimes}
                  setAvailableTimes={setAvailableTimes}
                  closeModal={closeModal}
                />
                <img
                  className="close"
                  src={DeleteButton}
                  onClick={closeModal}
                  alt="delete button"
                />
              </div>
            </Popup>
          </div>
        </div>
        <div className="calendar-container">
          <div className="calendar">
            <FullCalendar
              height="100%"
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={allEvents.map((event) => ({
                ...event,
                backgroundColor: "green",
              }))}
              eventClick={handleEventClick}
            />
          </div>
          {Object.keys(selectedEvent).length > 0 && (
            <div className="selected-event">
              <div className="header">
                <h2>{selectedEvent.title}</h2>
                <p>Hosted by {selectedEvent.groupName}</p>
              </div>

              <div className="divider" />

              <div className="section description">
                <h2 className="section-title">Description</h2>
                <p>{selectedEvent.description}</p>
              </div>

              <div className="divider" />

              <div className="section restaurant">
                <h2 className="section-title">Restaurant</h2>
                <h3>{selectedEvent.restaurant}</h3>
                <p onClick={sendText}>
                  <img
                    src={map}
                    alt="map"
                  />
                  Text me the address
                </p>
              </div>

              <div className="divider" />

              <div className="section people">
                <h2 className="section-title">Group</h2>
                <h3>{selectedEvent.groupName}</h3>
                {/* ---- carpool ---- */}
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setCarpoolOpen((o) => !o)}
                >
                  <img
                    src={car}
                    alt="map"
                  />
                  View carpool details
                </p>
                <CarpoolPopup
                  openCarpool={openCarpool}
                  closeCarpoolModal={closeCarpoolModal}
                  selectedEvent={selectedEvent}
                  currentUser={props.currentUser}
                  passengers={passengers}
                />
                {/* ---- guest list ---- */}
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setGuestListOpen((o) => !o)}
                >
                  <img
                    src={people}
                    alt="map"
                  />
                  See who's coming
                </p>
                <GuestListPopup
                  guestListOpen={openGuestList}
                  closeGuestListModal={closeGuestListModal}
                  going={going}
                  notGoing={notGoing}
                  unconfirmed={unconfirmed}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="second-section">
        <div className=" event-section-header">
          <h2>Pending events</h2>
          <div className="event-filter">
            {" "}
            <span
              className={hostedClass}
              onClick={() => {
                setSelectedEventType("Hosted");
                setHostedClass("selected");
                setInvitedToClass("unselected");
              }}
            >
              Hosting
            </span>
            <div className="divider" />
            <span
              className={invitedToClass}
              onClick={() => {
                setSelectedEventType("Invited To");
                setHostedClass("unselected");
                setInvitedToClass("selected");
              }}
            >
              Invited To
            </span>
          </div>
        </div>
        {selectedEventType === "Hosted" ? (
          hosted.length > 0 ? (
            hosted
              .filter((item) => !item.restaurant)
              .map((event, index) => (
                <InvitationCard
                  currentUser={props.currentUser}
                  guest={false}
                  key={index}
                  event={event}
                  close={closeModal}
                />
              ))
          ) : (
            <NoResults
              className="pending-no-results"
              message="Nothing to see here."
            />
          )
        ) : invitedTo.filter((event) => !deadlinePassed(event.rsvpDeadline)).length > 0 ? (
          invitedTo
            .filter((event) => !deadlinePassed(event.rsvpDeadline))
            .filter((item) => !item.restaurant)
            .map((event, index) => (
              <InvitationCard
                currentUser={props.currentUser}
                guest={true}
                key={index}
                event={event}
                groups={props.groups}
                availableTimes={availableTimes}
                setAvailableTimes={setAvailableTimes}
                close={closeModal}
              />
            ))
        ) : (
          <NoResults
            className="pending-no-results"
            message="Nothing to see here."
          />
        )}
      </div>
    </div>
  );
}
