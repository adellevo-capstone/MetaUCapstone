import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import HostedEvents from "./HostedSection/HostedEvents";
import EventsInvitedTo from "./InvitedToSection/EventsInvitedTo";
import InvitationForm from "./InvitationForm/InvitationForm";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Event.css";

export default function Event(props) {
  const [error, setError] = useState("");
  const [hosted, setHosted] = useState([]);
  const [invitedTo, setInvitedTo] = useState([]);
  const [startTime, setStartTime] = useState("00:00");
  const [availableTimes, setAvailableTimes] = useState(new Map());

  useEffect(() => {
    loadAllEvents();
  }, []);

  const loadAllEvents = async () => {
    try {
      const res = await API.get("api/v1/auth/events");
      setHosted(res.data.hosted);
      setInvitedTo(res.data.invitedTo);
    } catch (err) {
      setError(error);
    }
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event.title);
  };

  return (
    <div className="events">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2022-07-10" },
          { title: "event 2", date: "2022-07-02" },
        ]}
        eventClick={handleEventClick}
      />
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
