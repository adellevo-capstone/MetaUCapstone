import React, { useState } from "react";
import API from "../../utils/API";
import SearchPopup from "../Shared/components/SearchPopup/SearchPopup";

export default function GroupSearch(props) {
  const addMembers = async (groupId) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const memberIds = props.usersToAdd.map((user) => {
        return user._id;
      });
      const body = { members: memberIds };
      await API.patch(`api/v1/auth/group/${groupId}/addMembers`, body, config);
      props.loadAllGroups();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchPopup
      itemsToAdd={props.usersToAdd}
      setItemsToAdd={props.setUsersToAdd}
      searchedItems={props.displayedUsers}
      addItems={addMembers}
      setSearchQuery={props.setSearchQuery}
      setLocation={props.setLocation}
      findItem={props.findUsers}
      buttonText={"Add members"}
      typeToAdd={"Member"}
      actionType={"add"}
      groupId={props.groupId}
    />
  );
}
