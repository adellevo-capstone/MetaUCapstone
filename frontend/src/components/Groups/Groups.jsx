import React, { useState, useEffect } from "react";
import "../Groups/Groups.css";
import API from "../../utils/API";
import Popup from "reactjs-popup";
import GroupSearch from "./GroupSearch";

export default function Groups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
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
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div>
      <Popup
        // closeOnDocumentClick
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
          loadAllGroups={loadAllGroups}
        />
      </Popup>
      <h2>My groups</h2>
      <div className="groups">
        {groups.map((group) => (
          <div className="group-content">
            <h3>{group.groupInfo.name}</h3>
            <p>{group.memberInfo.length} members</p>
            <ul>
              {group.memberInfo.map((member, index) => (
                <li key={index}>{member.firstName + " " + member.lastName}</li>
              ))}
            </ul>
            <button>Add a member</button>
          </div>
        ))}
      </div>
    </div>
  );
}
