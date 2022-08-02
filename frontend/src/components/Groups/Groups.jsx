import React from "react";
import SearchPopup from "../Shared/components/SearchPopup/SearchPopup";
import NextButton from "../Shared/assets/ForwardArrow.svg";
import { Link } from "react-router-dom";
import "../Groups/Groups.css";
import NoResults from "../Shared/components/NoResults/NoResults";

export default function Groups(props) {
  return (
    <div className="group-section">
      <div className="group-section-header">
        <h1>My groups</h1>
        <SearchPopup
          itemsToAdd={props.usersToAdd}
          setItemsToAdd={props.setUsersToAdd}
          searchedItems={props.displayedUsers}
          setSearchQuery={props.setSearchQuery}
          setLocation={props.setLocation}
          findItem={props.findUsers}
          buttonText={"Create group"}
          typeToAdd={"Member"}
          actionType={"create"}
          groupId={props.groupId}
          loadAllGroups={props.loadAllGroups}
        />
      </div>
      <div className="groups-container">
        {props.groups.length === 0 ? (
          <NoResults
            message={"Nothing to see here yet. Click the button above to create your first group!"}
          />
        ) : (
          props.groups.map((group, index) => (
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
                  src={NextButton}
                  alt="next"
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
