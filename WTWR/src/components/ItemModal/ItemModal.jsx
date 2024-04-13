import "./ItemModal.css";

function ItemModal(props) {
  return (
    <div className="itemModal">
      <div className="itemModal__container">
        <button
          type="button"
          className="itemModal__button"
          onClick={props.onClose}
        ></button>
        <img className="itemModal__image" src={props.image} alt={props.name} />
        <div className="itemModal__info">
          <p className="itemModal__text">{props.name}</p>
          <p className="itemModal__text">{`Weather: ${props.weather}`}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
