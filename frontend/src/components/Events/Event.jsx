import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import InvitationForm from "./InvitationForm/InvitationForm";
import InvitationCard from "./InvitationForm/InvitationCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import map from "../Shared/assets/Map.svg";
import car from "../Shared/assets/Car.svg";
import people from "../Shared/assets/People.svg";
import "./Event.css";
import deleteButton from "../Shared/assets/DeleteButton.svg";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./InvitationForm/DND/TaskBoard";

export default function Event(props) {
  const [error, setError] = useState("");
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  const [startTime, setStartTime] = useState("00:00");
  const [availableTimes, setAvailableTimes] = useState(new Map());
  const [selectedEvent, setSelectedEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);

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

  useEffect(() => {
    loadAllEvents();
    // loadPreviousResponse();
  }, []);

  const loadAllEvents = async () => {
    try {
      const res = await API.get("api/v1/auth/events");
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

  return (
    <div className="events">
      {/* Popup for creating an invitation */}
      <span
        className="button"
        onClick={() => setOpen((o) => !o)}
      >
        Create an invitation
      </span>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        modal
        nested
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "0.5em",
            borderRadius: "2em",
          }}
        >
          <img
            className="close"
            src={deleteButton}
            onClick={closeModal}
            alt="delete button"
          />
          <InvitationForm
            groups={props.groups}
            startTime={startTime}
            setStartTime={setStartTime}
            availableTimes={availableTimes}
            setAvailableTimes={setAvailableTimes}
          />
        </div>
      </Popup>
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
            <div className="description">
              <p>
                {selectedEvent.title} with {selectedEvent.groupName}
              </p>
              <p>{selectedEvent.restaurant}</p>
              <p>{selectedEvent.description}</p>
              <p>{selectedEvent.time}</p>
              <p>{selectedEvent.date}</p>
            </div>

            <div className="card-actions">
              <p onClick={sendText}>
                <img
                  src={map}
                  alt="map"
                />
                Text me the address
              </p>
              <Popup
                closeOnDocumentClick
                modal
                nested
                trigger={
                  <p>
                    <img
                      src={car}
                      alt="map"
                    />
                    View carpool details
                  </p>
                }
              >
                <DndProvider backend={HTML5Backend}>
                  <div
                    className="carpool-details"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      padding: "0.5em",
                      borderRadius: "2em",
                      minWidth: "60%",
                      minHeight: "60%",
                    }}
                  >
                    <TaskBoard passengers={passengers} />
                  </div>
                </DndProvider>
              </Popup>
              <p>
                <img
                  src={people}
                  alt="map"
                />
                See who's coming
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Sections for created events */}
      <div>
        {/* only display nonfinalized events */}
        <h2>Pending events</h2>
        <h3>Hosted by me</h3>
        {hosted
          .filter((item) => !item.restaurant)
          .map((event, index) => (
            <InvitationCard
              currentUser={props.currentUser}
              guest={false}
              key={index}
              event={event}
            />
          ))}
        <h3>I was invited to</h3>
        {invitedTo
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
            />
          ))}
      </div>
    </div>
  );
}
