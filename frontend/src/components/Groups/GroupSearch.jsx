import React, { useState } from "react";
import API from "../../utils/API";
import { useEffect } from "react";

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
        return user.userId;
      });
      const body = { members: memberIds };
      await API.patch(`api/v1/auth/group/${groupId}/addMembers`, body, config);
      props.loadAllGroups();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-popup">
      <h1>Search for a user to add</h1>
      <div className="search-popup-content">
        <input
          className="search"
          type="text"
          name="user"
          placeholder="Type in a name..."
          onChange={(e) => props.setSearchQuery(e.target.value)}
        />
        <button onClick={findUsers}>Search</button>
        <div>
          <h2>Search results:</h2>
          <ul>
            {displayedUsers.map((user, index) => (
              <li
                key={index}
                onClick={() =>
                  setUsersToAdd([
                    ...usersToAdd,
                    { name: user.firstName + " " + user.lastName, userId: user._id },
                  ])
                }
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Users to add:</h2>
          <ul>
            {usersToAdd.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
          {props.actionType !== "addMembers" && (
            <input
              className="group name"
              type="text"
              name="user"
              placeholder="Pick a group name..."
              onChange={(e) => setGroupName(e.target.value)}
            />
          )}

          {props.actionType === "addMembers" ? (
            <button onClick={() => addMembers(props.groupId)}>Confirm</button>
          ) : (
            <button onClick={createGroup}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
}
