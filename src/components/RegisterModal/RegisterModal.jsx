import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../../utils/formValidation";
import "./RegisterModal.css";

const RegisterModal = ({ onClose, handleRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    avatar:"",
  });

  const isFormValid = useFormValidation(data.email, data.password, true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]:value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  }

  return (
    <ModalWithForm
      name="form"
      title="Register"
      buttonText="Next"
      onSubmit={handleSubmit}
      onClose={onClose}
      isFormValid={isFormValid}
    >
      <div className="modal__text_container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          className="modal__input"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          className="modal__input"
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="modal__input"
          required
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Name"
          className="modal__input"
          required
        />
                <label htmlFor="avatar">Avatar URL</label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="modal__input"
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;