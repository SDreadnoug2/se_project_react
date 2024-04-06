import "./ItemCard.css";

function ItemCard(props) {
  return (
    <div className="itemCard">
      <div className="itemCard__title">
        <h2 className="itemCard__title_text">T-Shirt</h2>
      </div>
      <img className="itemCard__image" src="../src/assets/T-Shirt.png"></img>
    </div>
  );
}

export default ItemCard;
