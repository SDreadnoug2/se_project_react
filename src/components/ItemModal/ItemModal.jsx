import "./ItemModal.css";
import { useEffect } from "react";

function ItemModal(props) {
  useEffect(() => {
    const modal = document.querySelector(".itemModal");
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    modal.addEventListener("mouseup", (event) => {
      if (event.target === modal) {
        props.onClose();
      }
    });

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [props.onClose]);

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
