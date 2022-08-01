import React, { useState } from "react";
import API from "../../utils/API";
import SearchPopup from "../Shared/components/SearchPopup/SearchPopup";
import "../Profile/FavoritesSection/FavoriteRestaurants/FavoriteRestaurants.css";

export default function GroupSearch(props) {
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const findUsers = async () => {
    try {
      const filteredUsers = props.allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(props.searchQuery.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const createGroup = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const memberIds = usersToAdd.map((user) => {
        return user.userId;
      });
      const body = { name: groupName, members: memberIds };
      await API.patch("api/v1/auth/group/create", body, config);
      props.loadAllGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const addMembers = async (groupId) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const memberIds = usersToAdd.map((user) => {
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
      itemsToAdd={usersToAdd}
      setItemsToAdd={setUsersToAdd}
      searchedItems={displayedUsers}
      addItems={addMembers}
      popupHeader={"Find a restaurant"}
      setSearchQuery={props.setSearchQuery}
      setLocation={props.setLocation}
      findItem={findUsers}
      buttonText={"Add members"}
      typeToAdd={"Member"}
      groupId={props.groupId}
    />
  );
}
