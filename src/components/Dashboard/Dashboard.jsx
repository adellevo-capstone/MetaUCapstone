import React, { useState } from "react";
import ProfileBar from "../ProfileBar/ProfileBar";
import "./Dashboard.css";

export default function Dashboard({ data }) {
  return (
    <div className="dashboard">
      <ProfileBar
        header={"Likes"}
        subHeader={"My go-tos"}
        data={data}
      />
      <ProfileBar
        header={"Dislikes"}
        subHeader={"Not really my taste"}
        data={data}
      />
      <ProfileBar
        header={"Restrictions"}
        subHeader={"No-gos"}
        data={data}
      />
    </div>
  );
}
