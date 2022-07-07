import React, { useState, useEffect } from "react";
import "../Groups/Groups.css";
import API from "../../utils/API";

export default function Groups(props) {
  // const members = ["Adelle Vo", "Naomi Donato", "Janice Park"];
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get("api/v1/auth/allUsers");
      console.log(res.data);
      setMembers(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="groups">
      <div>
        <h2>305 group</h2>
        {members.map((member) => (
          <div>
            {member.firstName} {member.lastName}
          </div>
        ))}
        {/* popup for all members in database */}
        <button>Add a member</button>
      </div>
    </div>
  );
}
