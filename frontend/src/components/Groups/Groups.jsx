import React, { useState, useEffect } from "react";
import "../Groups/Groups.css";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import GroupSearch from "./GroupSearch";
import nextButton from "../Shared/assets/NextButton.svg";
import { Link } from "react-router-dom";

export default function Groups(props) {
  return (
    <div className="group-section">
      <div className="group-section-header">
        <h1>My groups</h1>
        <Popup
          modal
          nested
          trigger={<span className="button"> Create a group </span>}
          style={{
            minWidth: "40em",
          }}
        >
          <GroupSearch
            actionType={"createGroup"}
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            location={props.location}
            setLocation={props.setLocation}
            loadAllUsers={props.loadAllUsers}
            allUsers={props.allUsers}
            groups={props.groups}
            loadAllGroups={props.loadAllGroups}
          />
        </Popup>
      </div>
      <div className="groups-container">
        {props.groups.map((group, index) => (
          <div
            className="group"
            key={index}
          >
            <div className="label">
              <h2>{group.groupInfo.name}</h2>
              <p>{group.memberInfo.length} members</p>
            </div>
            <Link to={`${group.groupInfo.name}`}>
              <img
                src={nextButton}
                alt="next"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
