import React, { useState, useEffect } from "react";
import "../Groups/Groups.css";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import GroupSearch from "./GroupSearch";

export default function Groups(props) {
  // const members = ["Adelle Vo", "Naomi Donato", "Janice Park"];
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  // ---- Get all favorite restaurants from dietary profile ----

  useEffect(() => {
    loadAllGroups();
    loadAllUsers();
  }, []);

  const loadAllGroups = async () => {
    try {
      const res = await API.get("api/v1/auth/group");
      setGroups(res.data.groups);
    } catch (err) {
      console.log(err.response);
    }
  };

  const loadAllUsers = async () => {
    try {
      const res = await API.get("api/v1/auth/allUsers");
      console.log(res.data);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getUserName = (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div>
      <Popup
        closeOnDocumentClick
        modal
        nested
        trigger={<button> Create a group </button>}
        style={{
          minWidth: "40em",
        }}
      >
        <GroupSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          loadAllUsers={loadAllUsers}
          allUsers={allUsers}
          // members={members}
          // setNewRestaurant={setNewRestaurant}
        />
      </Popup>
      <h2>My groups</h2>
      <div className="groups">
        {groups.map((group) => (
          <div className="group-content">
            <h3>{group.name}</h3>
            <p>{group.members.length} members</p>
            {group.members.map((memberId, index) =>
              index === group.members.length - 1
                ? getUserName(memberId)
                : getUserName(memberId) + ", "
            )}
            <button>Add a member</button>
          </div>
        ))}
      </div>
    </div>
  );
}
