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

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    try {
      const res = await API.get("api/v1/auth/allUsers");
      console.log(res.data);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err.response);
    }
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
        {/* <div>
          <h2>305 group</h2>
          {members.map((member) => (
            <div>
              {member.firstName} {member.lastName}
            </div>
          ))}
         
          <button>Add a member</button>
        </div> */}
      </div>
    </div>
  );
}
