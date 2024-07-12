
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../../utils/formValidation";
import "./EditProfileModal.css"

const EditProfileModal = ({ onSubmitEdit }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormValid = useFormValidation(name, avatar, true);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitEdit({name, avatar})
  };

  return (
    <ModalWithForm
      name="form"
      title="Change Profile Data"
      buttonText="Save Changes"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <div className="modal__text_container">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          className="modal__input"
        />
        <label htmlFor="url">Avatar *</label>
        <input
          type="url"
          id="url"
          name="url"
          value={avatar}
          onChange={handleAvatarChange}
          placeholder="Image URL"
          className="modal__input"
        />
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
