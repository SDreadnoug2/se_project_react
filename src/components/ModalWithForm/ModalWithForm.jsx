import React, { useEffect, useRef, useContext } from "react";
import "./ModalWithForm.css";

function ModalWithForm(props) {

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
    <div ref={modalRef} className="modal">
      <div className={`modal_type_${props.name}`}>
        <button className="modal__close" onClick={props.onClose} />
        <h2 id={`${props.name}Title`} className="modal__title">
          {props.title}
        </h2>
        <form
          className="modal__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <div className="modal__submit_section">
            <button
              className={`${
                props.isFormValid ? "modal__submit_enabled" : "modal__submit"
              }`}
              type="submit"
              disabled={!props.isFormValid}
            >
              {props.buttonText}
            </button>
            {props.title === "Log in" && (
              <button className="modal__button" type="button">or Register</button>
            )}
            {props.title === "Register" && (
              <button className="modal__button" type="button">or Login</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
