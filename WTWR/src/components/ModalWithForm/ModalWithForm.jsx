import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <form className="modalWithForm">
      <p className="modalWithForm__heading">New Garment</p>
      <label className="modalWithForm__label">
        Name
        <input
          className="modalWithForm__placeholder"
          type="text"
          name="name"
          placeholder="Name"
        />
      </label>
      <label className="modalWithForm__label">
        Image
        <input
          className="modalWithForm__placeholder"
          type="text"
          name="imageLink"
          placeholder="Image URL"
        />
      </label>
      <div className="modalWithForm__radio">
        Select the weather type:
        <label>
          <input className="modalWithForm__text" type="radio" name="Hot" />
          Hot
        </label>
        <label>
          <input className="modalWithForm__text" type="radio" name="Warm" />
          Warm
        </label>
        <label>
          <input className="modalWithForm__text" type="radio" name="Cold" />
          Cold
        </label>
      </div>
      <button className="modalWithForm__text" type="submit">
        Add garment
      </button>
    </form>
  );
}

export default ModalWithForm;
