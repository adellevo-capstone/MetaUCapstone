import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import GroupSearch from "./GroupSearch";
import API from "../../utils/API";
import nextButton from "../Shared/assets/NextButton.svg";

export default function GroupDetail(props) {
  const params = useParams();

  const findGroupByName = () => {
    return props.groups.find((group) => params.name === group.groupInfo.name);
  };

  const groupName = findGroupByName().groupInfo.name;
  const groupId = findGroupByName().groupInfo._id;
  const members = findGroupByName().memberInfo;

  return (
    <div className="group-detail">
      <div className="header-actions-container">
        <div className="group-detail-header">
          <h1>{groupName}</h1>
          <p>{members.length} members</p>
        </div>
        <Popup
          modal
          nested
          trigger={<span className="button"> Add group members </span>}
          style={{
            minWidth: "40em",
          }}
        >
          <GroupSearch
            actionType={"addMembers"}
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            location={props.location}
            setLocation={props.setLocation}
            loadAllUsers={props.loadAllUsers}
            allUsers={props.allUsers}
            loadAllGroups={props.loadAllGroups}
            groupId={groupId}
            currentUser={props.currentUser}
          />
        </Popup>
        <span
          className="button"
          onClick={() => props.leaveGroup(groupId)}
        >
          Leave group
        </span>
      </div>

      <div>
        <div className="group-members">
          {members.map((member, index) => (
            <div
              className="member-card"
              key={index}
            >
              <div>
                <p>{member.firstName + " " + member.lastName}</p>
                <p>@mistedlilacs</p>
              </div>
              <img
                src={nextButton}
                alt="next"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
