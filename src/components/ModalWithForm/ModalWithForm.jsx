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

    const handleMouseDown = (event) => {
      if (event.target === modalRef.current) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    if (modalRef.current) {
      modalRef.current.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      if (modalRef.current) {
        modalRef.current.removeEventListener("mousedown", handleMouseDown);
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
              <button className="modal__button" type="button" onClick={props.altButtonHandler}>{props.altButtonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
