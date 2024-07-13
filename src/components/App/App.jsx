import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { isLoggedInContext} from "../../contexts/isLoggedInContext"
import { getItems, createItem, deleteItem, getUserInfo, editProfile, addCardLike, removeCardLike} from "../../utils/api";
import ProtectedRoute from "../../utils/ProtectedRoute";
import * as Auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { removeToken } from "../../utils/token";

function App() {
  //form modal
  const [userData, setUserData] = useState({name: "", email: "", avatar: "", _id: ""});
  const [activeModal, setActiveModal] = useState(null);
  const [modalInfo, setModalInfo] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = (modalName, modalData) => {
    setActiveModal(modalName);
    setModalInfo(modalData);
  };

  function updateUser(jwt) {
    getUserInfo(jwt).then((res) => {
      const { name, email, avatar, _id } = res.data;
      setIsLoggedIn(true);
      setUserData({ name, email, avatar, _id });
    }).catch(console.error);
  }

    //Check for JWT
    useEffect(() => {
      const jwt = getToken();
      if (!jwt) {
        return;
      }
      updateUser(jwt)
    }, []);

    useEffect(() => {
      if (isLoggedIn && userData._id) {
        getItems()
          .then((data) => {
            const userItems = data.filter(item => item.owner === userData._id);
            setClothingItems(userItems);
          })
          .catch((error) => console.error("Failed to fetch items: ", error));
      } else {
        getItems()
          .then((data) => {
            setClothingItems(data);
          })
          .catch((error) => console.error("Failed to fetch items: ", error));
      }
    }, [userData, isLoggedIn,]);

  const closeModal = () => {
    setActiveModal(null);
    setModalInfo({});
  };
  const handleImageClick = (link, name, weather, id, owner) => {
    openModal("item-modal", { link, name, weather, id, owner });
  };


  const handleAddItemSubmit = (name, url, weather) => {
    const item = {
      name: name,
      imageUrl: url,
      weather: weather,
      owner: userData._id
    };
    createItem(item)
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
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
    deleteItem(id).then(() => {
      const updatedItems = clothingItems.filter((item) => item._id !== id);
      setClothingItems(updatedItems);
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



  // Initial Page Load
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
    if(!email || !password) {
      return;
    }
    Auth.login(email, password).then((data) => {
      if(data.token){
        setToken(data.token);
        updateUser(data.token);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/profile";
        navigate(redirectPath);
      }
    }).catch(console.error);
  };
// Handle SignOut
  const signOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  // HANDLE REGISTER
  const handleRegister = ({email, password, confirmPassword, name, avatar}) => {
    if(password === confirmPassword) {
      Auth.register(name, avatar, email, password).then((data) => {
        handleLogin({email, password});
      }).catch(console.error);
    }
  };

  

  const onSubmitEdit = ({name, avatar}) => {
    editProfile({name, avatar});
    setUserData({name: name, avatar: avatar})
  }

// Liking Cards
const handleCardLike = ({ id, isLiked }) => {
  const token = localStorage.getItem("jwt");
  !isLiked
    ? addCardLike(id, token)
      .then((updatedCard) => {
        const changedCard = updatedCard.data;
        console.log(changedCard);
        setClothingItems(clothingItems.map((item) => (item._id === id ? changedCard : item))
      );
      })
      .catch((err) => console.log(err))
    : removeCardLike(id, token)
      .then((updatedCard) => {
        const changedCard = updatedCard.data
        setClothingItems(clothingItems.map((item) => (item._id === id ? changedCard : item))
        );
      })
      .catch((err) => console.log(err));
};

  //Layout
  return (
    <div className="App">
      <ActiveModalContext.Provider value={{activeModal, setActiveModal, closeModal}}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <ClothingListContext.Provider value={{ clothingItems }}>
              <UserInfoContext.Provider value={userData}>
                <isLoggedInContext.Provider value={isLoggedIn}>
                  <Header
                    location={climate.location}
                    garmentModal={() => openModal("add-garment")}
                    loginModal={() => openModal("login-modal")}
                    registerModal={() => openModal("register-modal")}
                    userData={userData}
                    setIsLoggedIn={setIsLoggedIn}
                    isLoggedIn={isLoggedIn}
                  />
                  {activeModal === "register-modal" && (
                    <RegisterModal
                      onClose={closeModal}
                      handleRegister={handleRegister}
                      />
                  )}
                  {activeModal === "edit-profile-modal" && (
                    <EditProfileModal 
                    onSubmitEdit={onSubmitEdit}/>
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
                      owner={modalInfo.owner}
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
                          handleCardLike={handleCardLike}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute isLoggedIn={isLoggedIn} anonymous={false}>
                          <Profile
                            garmentModal={() => openModal("add-garment")}
                            signOut={signOut}
                            handleImageClick={handleImageClick}
                            handleCardLike={handleCardLike}
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
                </isLoggedInContext.Provider>
              </UserInfoContext.Provider>

          </ClothingListContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </ActiveModalContext.Provider>
    </div>
  );
}

export default App;
