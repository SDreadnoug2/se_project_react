import React from "react";
import "./SideBar.css";
function SideBar() {
  const name = "Billy Billyson";
  return (
    <div className="SideBar">
      <img
        className="SideBar__picture"
        src="./src/assets/tempPP.jpg"
        alt="profile picture"
      ></img>
      <h2 className="SideBar__name">{name}</h2>
    </div>
  );
}

export default SideBar;
