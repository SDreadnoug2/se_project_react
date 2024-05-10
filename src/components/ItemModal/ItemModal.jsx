import "./ItemModal.css";
import { useEffect, useRef } from "react";

function ItemModal(props) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    const handleMouseUp = (event) => {
      if (event.target === modalRef.current) {
        props.onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    if (modalRef.current) {
      modalRef.current.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      if (modalRef.current) {
        modalRef.current.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [props.onClose]);

  return (
    <div ref={modalRef} className="itemModal">
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
