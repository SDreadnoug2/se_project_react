import React, { useRef, useEffect } from "react";
import "./ConfirmDeleteModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ConfirmDeleteModal(props) {
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
    <div ref={modalRef} className="confirm">
      <div className="confirm__box">
        <button
          type="button"
          className="confirm__close-button"
          onClick={props.onClose}
        ></button>
        <div className="confirm__info">
          <p className="confirm__text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <button
            type="submit"
            className=" confirm__text confirm__delete confirm__highlight"
            onClick={props.onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className=" confirm__cancel confirm__highlight"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
