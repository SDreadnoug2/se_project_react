import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../../utils/formValidation";
import "./LoginModal.css";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";

const LoginModal = ({handleLogin }) => {
  const {activeModal, setActiveModal, closeModal} = useContext(ActiveModalContext);
  const [data, setData] = useState({
    email: "",
    password: "",
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
    closeModal();
  }

  return (
    <ModalWithForm
      name="form"
      title="Log in"
      buttonText="Log In"
      onSubmit={handleSubmit}
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
        <label htmlFor="password">Image</label>
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
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
