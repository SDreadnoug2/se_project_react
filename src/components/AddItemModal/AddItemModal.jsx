import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Added Garment: ${name},${imageUrl},${weather}`);
    onAddItem(name, imageUrl, weather);
  };

  return (
    <ModalWithForm
      name="form"
      title="New garment"
      buttonText="Add garment"
      onSubmit={handleSubmit}
      onClose={onCloseModal}
    >
      <div className="modal__text_container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className="modal__input"
        />
        <label htmlFor="Image">Image</label>
        <input
          type="url"
          id="url"
          name="url"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Image URL"
          className="modal__input"
        />
        <p className="modal__title_radio">Select the Weather Type:</p>
        <ul className="modal__radio">
          <label htmlFor="hot" className="modal__radio_select">
            <input
              type="radio"
              id="hot"
              name="weatherType"
              value="hot"
              className="modal__radio_input"
              onChange={handleWeatherChange}
            />
            Hot
          </label>
          <label htmlFor="Warm" className="modal__radio_select">
            <input
              type="radio"
              id="Warm"
              name="weatherType"
              value="warm"
              className="modal__radio_input"
              onChange={handleWeatherChange}
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__radio_select">
            <input
              type="radio"
              id="cold"
              name="weatherType"
              value="cold"
              className="modal__radio_input"
              onChange={handleWeatherChange}
            />
            Cold
          </label>
        </ul>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
