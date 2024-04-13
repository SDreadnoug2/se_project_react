import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./App.css";

function App() {
  //form modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const changeModalState = () => setIsModalOpen(!isModalOpen);
  const temperature = "90";

  return (
    <>
      <div className="App">
        {isModalOpen && (
          <ModalWithForm
            name="form"
            title="New garment"
            buttonText="Add garment"
            onClose={changeModalState}
          >
            <div className="modal__text_container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="modal__input"
              />
              <label htmlFor="Image">Image</label>
              <input
                type="url"
                id="url"
                name="url"
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
                  />
                  Cold
                </label>
              </ul>
            </div>
          </ModalWithForm>
        )}
        <Header toggleModal={changeModalState} />
        <Main temp={temperature} />
        <Footer />
      </div>
    </>
  );
}

export default App;
