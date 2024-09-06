import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormValidation from "../../utils/formValidation";
import "./LoginModal.css";
import { ErrorMessageContext } from "../../contexts/ErrorMessageContext";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";

const LoginModal = ({handleLogin }) => {
  const {activeModal, setActiveModal} = useContext(ActiveModalContext);
  const errorMessage = useContext(ErrorMessageContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSwitchToRegister = () => setActiveModal("register-modal");


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
      handleLogin(data)
  }
  //props.altButtonHandler}>{props.altButtonText
  return (
    <ModalWithForm
      name="form"
      title="Log in"
      buttonText="Log In"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      altButtonHandler={handleSwitchToRegister}
      altButtonText={"or Register"}
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
        <span className="modal__input_error">{errorMessage}</span>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
