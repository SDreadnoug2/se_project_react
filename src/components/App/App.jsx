import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeatherData } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";

function App() {
  //form modal
  const [activeModal, setActiveModal] = useState(null);
  const [modalInfo, setModalInfo] = useState({});
  const openModal = (modalName, modalData) => {
    setActiveModal(modalName);
    setModalInfo(modalData);
  };
  const closeModal = () => {
    setActiveModal(null);
    setModalInfo({});
  };

  const handleImageClick = (link, name, weather) => {
    console.log("Opening modal for:", name);
    openModal("item-modal", { link, name, weather });
  };

  //set Temp
  const [climate, setClimate] = useState({
    temp: "Loading...",
    location: "Loading...",
  });
  useEffect(() => {
    getWeatherData()
      .then((data) => {
        console.log(data);
        setClimate(data);
      })
      .catch((error) => console.error(error));
  }, []);

  //Layout
  return (
    <div className="App">
      {activeModal === "add-garment" && (
        <ModalWithForm
          name="form"
          title="New garment"
          buttonText="Add garment"
          onClose={closeModal}
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
      {activeModal === "item-modal" && (
        <ItemModal
          image={modalInfo.link}
          name={modalInfo.name}
          weather={modalInfo.weather}
          onClose={closeModal}
        />
      )}
      <Header
        location={climate.location}
        garmentModal={() => openModal("add-garment")}
      />
      <Main temp={climate.temp} handleImageClick={handleImageClick} />
      <Footer />
    </div>
  );
}

export default App;
