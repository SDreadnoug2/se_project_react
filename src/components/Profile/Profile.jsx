import "./Profile.css";
import React from "react";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile(props) {
  return (
    <div className="Profile">
      <SideBar></SideBar>
      <ClothesSection
        addClothes={props.garmentModal}
        ImageClick={props.handleImageClick}
      ></ClothesSection>
    </div>
  );
}

export default Profile;
