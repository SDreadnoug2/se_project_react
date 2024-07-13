import React, { useContext } from "react";
import { ClothingListContext } from "../../../contexts/ClothingListContext";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";
import { UserInfoContext } from "../../../contexts/UserInfoContext";

function ClothesSection(props) {
  const userData = useContext(UserInfoContext);
  const { clothingItems } = useContext(ClothingListContext);
  return (
    <div className="ClothesSection">
      <div className="ClothesSection__wrapper-text">
        <h2 className="ClothesSection__text">Your Items</h2>
        <button
          type="button"
          className="ClothesSection__text ClothesSection__button"
          onClick={props.addClothes}
        >
          + Add New
        </button>
      </div>
      <div className="ClothesSection__items">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            name={item.name}
            link={item.imageUrl}
            id={props._id}
            handleCardLike={() => props.handleCardLike({ id: item._id, isLiked: item.likes.some(id => id === userData._id) })}
            handleCardClick={() =>
              props.ImageClick(item.imageUrl, item.name, item.weather, item._id, item.owner)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
