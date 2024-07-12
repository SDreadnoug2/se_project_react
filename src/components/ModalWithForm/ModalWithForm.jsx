import React, { useEffect, useRef, useContext } from "react";
import "./ModalWithForm.css";
import { ActiveModalContext} from "../../contexts/ActiveModalContext"

function ModalWithForm(props) {
  const { activeModal, setActiveModal, closeModal}  = useContext(ActiveModalContext);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const handleMouseUp = (event) => {
      if (event.target === modalRef.current) {
        closeModal();
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
  }, [closeModal]);

  return (
    <div ref={modalRef} className="modal">
      <div className={`modal_type_${props.name}`}>
        <button className="modal__close" onClick={closeModal} />
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
              <button className="modal__button" type="submit">or Register</button>
            )}
            {props.title === "Register" && (
              <button className="modal__button" type="submit">or Login</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
