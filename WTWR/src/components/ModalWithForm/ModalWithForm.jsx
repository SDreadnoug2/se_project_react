import "./ModalWithForm.css";

function ModalWithForm(props) {
  return (
    <div className="modal">
      <div className={`modal_type_${props.name}`}>
        <button className="modal__close" onClick={props.onClose}></button>
        <h2 id={`${props.name}Title`} className="modal__title">
          {props.title}
        </h2>
        <form className="modal__form" name={props.name}>
          {props.children}
          <button className="modal__submit" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
