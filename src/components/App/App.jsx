import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getWeatherData } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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

  //Temp Set + Controls
  const [climate, setClimate] = useState({
    temp: { F: "Loading", C: "Loading" },
    location: "Loading...",
  });
  useEffect(() => {
    getWeatherData()
      .then((data) => {
        const weather = {
          F: Math.round(data.temp),
          C: Math.round(((data.temp - 32) * 5) / 9),
          location: data.location,
        };
        setClimate(weather);
      })
      .catch((error) => console.error(error));
  }, []);
  const [currentTemperatureUnit, setCurentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  //Layout
  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
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
        <Main temp={climate} handleImageClick={handleImageClick} />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
