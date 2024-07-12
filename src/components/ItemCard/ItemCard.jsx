import "./ItemCard.css";

function ItemCard(props) {
  return (
    <div className="itemCard" onClick={props.onClick}>
      <div className="itemCard__title">
        <h2 className="itemCard__title_text">{props.name}</h2>
        <p className="itemCard__title_text" onClick={props.handleLike}></p>
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
