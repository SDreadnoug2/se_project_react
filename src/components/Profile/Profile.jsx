import "./Profile.css";
import React from "react";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile(props) {
  return (
    <div className="Profile">
      <SideBar signOut={props.signOut} />
      <ClothesSection
        addClothes={props.garmentModal}
        ImageClick={props.handleImageClick}
        handleCardLike={props.handleCardLike}
      ></ClothesSection>
    </div>
  );
}

export default Profile;
