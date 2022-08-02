import React from "react";
import { useParams, Link } from "react-router-dom";
import GroupSearch from "./GroupSearch";
import API from "../../utils/API";
import NextButton from "../Shared/assets/ForwardArrow.svg";
import BackButton from "../Shared/assets/BackArrow.svg";

export default function GroupDetail(props) {
  const params = useParams();

  const findGroupByName = () => {
    return props.groups.find((group) => params.name === group.groupInfo.name);
  };

  const groupName = findGroupByName().groupInfo.name;
  const groupId = findGroupByName().groupInfo._id;
  const members = findGroupByName().memberInfo;

  const leaveGroup = async () => {
    try {
      if (window.confirm(`Are you sure you want to leave "${groupName}"?`)) {
        await API.patch(`api/v1/auth/group/${groupId}/leave`);
        window.location = "/dashboard/groups";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="group-detail">
      <Link
        className="back"
        to="/dashboard/groups"
      >
        <span className="back">
          <img
            src={BackButton}
            alt="back"
          />
          <p>Back</p>
        </span>
      </Link>
      <div className="content-container">
        <div className="header-actions-container">
          <div className="group-detail-header">
            <h1>{groupName}</h1>
            <p>{members.length} members</p>
          </div>
          <GroupSearch
            usersToAdd={props.usersToAdd}
            setUsersToAdd={props.setUsersToAdd}
            findUsers={props.findUsers}
            searchQuery={props.searchQuery}
            setSearchQuery={props.setSearchQuery}
            location={props.location}
            setLocation={props.setLocation}
            loadAllUsers={props.loadAllUsers}
            allUsers={props.allUsers}
            loadAllGroups={props.loadAllGroups}
            currentUser={props.currentUser}
            groupId={groupId}
            displayedUsers={props.displayedUsers}
          />
          <span
            className="button"
            onClick={() => leaveGroup(groupId)}
          >
            Leave group
          </span>
        </div>
        <div className="group-member-container">
          <div className="group-members">
            {members.map((member, index) => (
              <div
                className="member-card"
                key={index}
              >
                <div>
                  <h2>{member.firstName + " " + member.lastName}</h2>
                  <p>@{member.username}</p>
                </div>
                <img
                  src={NextButton}
                  alt="next"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
