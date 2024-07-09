import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { getWeatherData } from "../../utils/weatherApi";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { ClothingListContext } from "../../contexts/ClothingListContext";
import { ActiveModalContext } from "../../contexts/ActiveModalContext";
import { getItems, createItem, deleteItem } from "../../utils/api";
import ProtectedRoute from "../../utils/ProtectedRoute";
import * as Auth from "../../utils/auth";

function App() {
  //form modal
  const [activeModal, setActiveModal] = useState(null);
  const [modalInfo, setModalInfo] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const openModal = (modalName, modalData) => {
    setActiveModal(modalName);
    setModalInfo(modalData);
    console.log(modalData);
  };
  const closeModal = () => {
    setActiveModal(null);
    setModalInfo({});
  };
  const handleImageClick = (link, name, weather, id) => {
    openModal("item-modal", { link, name, weather, id });
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => console.error("Failed to fetch items: ", error));
  }, []);

  const handleAddItemSubmit = (name, url, weather) => {
    const getNextId = (items) => {
      if (items.length === 0) return 1;
      const maxId = Math.max(...items.map((item) => item.id));
      return maxId + 1;
    };
    const item = {
      _id: getNextId(clothingItems),
      name: name,
      imageUrl: url,
      weather: weather,
    };
    createItem(item)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeModal();
      })
      .catch((error) => console.error("Failed to add clothing item: ", error));
  };

  const [deleteCard, setDeleteCard] = useState({});
  const openConfirmationModal = (id) => {
    setDeleteCard(id);
    setActiveModal("delete-modal");
  };

  const handleItemDelete = () => {
    const id = deleteCard;
    console.log(deleteCard);
    deleteItem(id).then(() => {
      const updatedItems = clothingItems.filter((item) => item._id !== id);
      setClothingItems(updatedItems);
      console.log(updatedItems);
      setDeleteCard({});
      closeModal().catch((error) =>
        console.error("Failed to delete card:", error)
      );
    });
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

  // HANDLE LOGIN
  const handleLogin = ({email, password}) => {
    console.log(email, password);
  }

  // HANDLE REGISTER
  const handleRegister = ({email, password, name, avatar}) => {
    const {userData} = {email, password, name, avatar}
    console.log(userData)
  };

  //Layout
  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <ClothingListContext.Provider value={{ clothingItems }}>
          <ActiveModalContext.Provider value={{activeModal}}>
            <Header
              location={climate.location}
              garmentModal={() => openModal("add-garment")}
              loginModal={() => openModal("login-modal")}
              registerModal={() => openModal("register-modal")}
            />
            {activeModal === "register-modal" && (
              <RegisterModal
                onClose={closeModal}
                handleRegister={handleRegister}
                />
            )}
            {activeModal === "delete-modal" && (
              <ConfirmDeleteModal
                onClose={closeModal}
                onConfirm={handleItemDelete}
              />
            )}
            {activeModal === "login-modal" && (
              <LoginModal
                onClose={closeModal}
                handleLogin={handleLogin}
              />
            )}
            {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={activeModal}
                onAddItem={handleAddItemSubmit}
                onCloseModal={closeModal}
              />
            )}
            {activeModal === "item-modal" && (
              <ItemModal
                image={modalInfo.link}
                name={modalInfo.name}
                weather={modalInfo.weather}
                id={modalInfo.id}
                onClose={closeModal}
                onDelete={openConfirmationModal}
                onConfirm={handleItemDelete}
              />
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    temp={climate}
                    handleImageClick={handleImageClick}
                    onRemove={handleItemDelete}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      garmentModal={() => openModal("add-garment")}
                      handleImageClick={handleImageClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace /> 
                  ) : (<Navigate to="/" replace/>)
                } 
              />
            </Routes>
            <Footer />
          </ActiveModalContext.Provider>
        </ClothingListContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
