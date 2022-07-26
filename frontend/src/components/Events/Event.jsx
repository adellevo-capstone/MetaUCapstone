import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import HostedEvents from "./HostedSection/HostedEvents";
import EventsInvitedTo from "./InvitedToSection/EventsInvitedTo";
import InvitationForm from "./InvitationForm/InvitationForm";
import InvitationCard from "./InvitationForm/InvitationCard";
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
      setSelectedEvent(newEvent);
    } catch (err) {
      setError(error);
    }
  };

  // const findRestaurant = async () => {
  //   try {
  //     const config = { headers: { "Content-Type": "application/json" } };
  //     const body = { location: props.location, searchQuery: props.searchQuery };

  //     // add categories to likes
  //     const res = await API.post("api/v1/auth/restaurantInfo", body, config);
  //     setSearchedRestaurants(res.data);
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

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
        )}
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
      <div>
        <h2>Pending events</h2>
        {/* only display nonfinalized events */}
        {allEvents
          .filter((item) => !item.restaurant)
          .map((event, index) =>
            props.currentUser._id === event.hostId ? (
              // hosted events
              <InvitationCard
                guest={false}
                key={index}
                event={event}
              />
            ) : (
              // events invited to
              <InvitationCard
                guest={true}
                key={index}
                event={event}
                groups={props.groups}
                availableTimes={availableTimes}
                setAvailableTimes={setAvailableTimes}
              />
            )
          )}
      </div>
    </div>
  );
}
