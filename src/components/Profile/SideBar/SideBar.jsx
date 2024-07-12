import React, {useContext} from "react";
import "./SideBar.css";
import { UserInfoContext } from "../../../contexts/UserInfoContext";
import { ActiveModalContext } from "../../../contexts/ActiveModalContext";


function SideBar() {
  const userData = useContext(UserInfoContext);
  const { activeModal, setActiveModal}  = useContext(ActiveModalContext);

  const openEditProfileModal = () => {
    setActiveModal("edit-profile-modal")
  };
  return (
    <div className="SideBar">
      <div className="SideBar__profile_wrapper">
        <img
          className="SideBar__profile_picture"
          src= {userData.avatar}
          alt="profile picture"
        ></img>
              <h2 className="SideBar__profile_name">{userData.name}</h2>
      </div>
      <div className="SideBar___ui">
        <h2 className="SideBar__ui_text" onClick={openEditProfileModal}>Change profile data</h2>
        <h2 className="SideBar__ui_text">Log Out</h2>
      </div>
    </div>
  );
}

export default SideBar;
