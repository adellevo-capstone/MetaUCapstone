import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import HostedEvents from "./HostedSection/HostedEvents";
import EventsInvitedTo from "./InvitedToSection/EventsInvitedTo";
import InvitationForm from "./InvitationForm/InvitationForm";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import map from "../Shared/assets/Map.svg";
import car from "../Shared/assets/Car.svg";
import people from "../Shared/assets/People.svg";
import "./Event.css";

export default function Event(props) {
  const [error, setError] = useState("");
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  const [startTime, setStartTime] = useState("00:00");
  const [availableTimes, setAvailableTimes] = useState(new Map());
  const [selectedEvent, setSelectedEvent] = useState({});
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    loadAllEvents();
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
      console.log(newEvent.start);
      setSelectedEvent(newEvent);
    } catch (err) {
      setError(error);
    }
  };

  return (
    <div className="events">
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
        <div className="selected-event">
          <div className="description">
            <p>
              {selectedEvent.title} with {selectedEvent.groupName}
            </p>
            <p>{selectedEvent.description}</p>
            <p>Time: {selectedEvent.time}</p>
            <p>Date: {selectedEvent.date}</p>
          </div>

          <div className="card-actions">
            <p>
              <img
                src={map}
                alt="map"
              />
              Text me the directions
            </p>
            <p>
              <img
                src={car}
                alt="map"
              />
              View carpool details
            </p>
            <p>
              <img
                src={people}
                alt="map"
              />
              See who's coming
            </p>
          </div>
        </div>
      </div>

      {/* Popup for creating an invitation */}
      <Popup
        closeOnDocumentClick
        modal
        nested
        trigger={<button> Create an invitation </button>}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "0.5em",
            borderRadius: "2em",
          }}
        >
          <InvitationForm
            groups={props.groups}
            startTime={startTime}
            setStartTime={setStartTime}
            availableTimes={availableTimes}
            setAvailableTimes={setAvailableTimes}
          />
        </div>
      </Popup>

      {/* Sections for created events */}
      <HostedEvents hosted={hosted} />
      <EventsInvitedTo
        invitedTo={invitedTo}
        groups={props.groups}
        startTime={startTime}
        setStartTime={setStartTime}
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
      />
    </div>
  );
}
