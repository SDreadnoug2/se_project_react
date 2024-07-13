import "./ItemCard.css";
import likedImage from "../../assets/liked.png"
import dislikedImage from "../../assets/unliked.png"

function ItemCard(props) {

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
        <img 
          src={props.isLiked ? likedImage : dislikedImage} 
          className="itemCard__like"
          onClick={handleLike} 
          alt={props.isLiked ? "Liked" : "Disliked"}
        />
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
