import "./ItemCard.css";
import React, {useContext} from "react";
import likedImage from "../../../public/assets/liked.png"
import dislikedImage from "../../../public/assets/unliked.png"
import { isLoggedInContext } from "../../contexts/isLoggedInContext";
function ItemCard(props) {
  const isLoggedIn = React.useContext(isLoggedInContext)
  function handleLike(e) {
    e.stopPropagation();
    props.handleCardLike({ id: props.id, isLiked: props.isLiked })
  }
  return (
    <div className="itemCard" onClick={props.handleCardClick}>
      <div className="itemCard__title">
        <div className="itemCard__title_wrapper">
          <h2 className="itemCard__title_text">{props.name}</h2>
        </div>
        {
          isLoggedIn ? (
          <img 
            src={props.isLiked ? likedImage : dislikedImage} 
            className="itemCard__like"
            onClick={handleLike} 
            alt={props.isLiked ? "Liked" : "Disliked"}
          />
          ) : (null)}
        
      </div>

      <img
        className="itemCard__image"
        src={`${props.link}`}
        alt={`${props.name}`}
      />
    </div>
  );
}

export default ItemCard;
