// IMPORTS
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import * as Auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { ErrorMessageContext } from "../../contexts/ErrorMessageContext";
import { isLoadingContext } from "../../contexts/isLoadingContext";
// Main App Function
function App() {

  // STATE AND VARIABLE DECLARATIONS
  const [userData, setUserData] = useState({name: "", email: "", avatar: "", _id: ""});
  const [activeModal, setActiveModal] = useState(null);
  const [modalInfo, setModalInfo] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteCard, setDeleteCard] = useState({});
  const [climate, setClimate] = useState({
    temp: { F: "Loading", C: "Loading" },
    location: "Loading...",
  });  
  const [cardsLoading, setCardsLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [infoLoading, setInfoLoading] = useState(true);
  const [currentTemperatureUnit, setCurentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };
  const navigate = useNavigate();
  const location = useLocation();

  // Modal Management
  const openModal = (modalName, modalData) => {
    setActiveModal(modalName);
    setModalInfo(modalData);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalInfo({});
    setErrorMessage("");
  };

  // EXISTING USER CONTENT CHECKs / INITIAL PAGE LOAD
      // Checks for existing user token
  function updateUser(jwt) {
    getUserInfo(jwt).then((res) => {
      const { name, email, avatar, _id } = res.data;
      setIsLoggedIn(true);
      setUserData({ name, email, avatar, _id });
    }).catch(console.error);
  }
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    } 
    updateUser(jwt)
  }, []);

      //Checks for login changes and updates user cards accordingly.
  useEffect(() => {
    setCardsLoading(true);
      getItems()
        .then((data) => {
          setClothingItems(data);
          setCardsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch items: ", error)
          setCardsLoading(false);
        });
    
  }, [isLoggedIn, userData]);
      //Fetches weather data from API.
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

  //Loading
  useEffect(() => {
    setInfoLoading(true);
    console.log(infoLoading);
    if(!cardsLoading && !weatherLoading){
      setInfoLoading(false);
      console.log(infoLoading)
    }
    },[cardsLoading, weatherLoading])
    

 // REGISTRATION
 const handleRegister = ({email, password, confirmPassword, name, avatar}) => {
  if(password === confirmPassword) {
    Auth.register(name, avatar, email, password).then((data) => {
      handleLogin({email, password});
      closeModal();
    }).catch((error) => {
      if (error === 'Error: 409'){
        setErrorMessage("This user already exists");
      }
    });
  }
  else {
    setErrorMessage("Passwords do not match.")
  }
 };

 // LOGIN
  const handleLogin = ({email, password}) => {
    if(!email || !password) {
      setErrorMessage("Please fill out both fields.")
      return;
    }
    Auth.login(email, password).then((data) => {
      console.log(data.token)
      if(data.token){
        setToken(data.token);
        updateUser(data.token);
        setIsLoggedIn(true);
        closeModal();
        const redirectPath = location.state?.from?.pathname || "/profile";
        navigate(redirectPath);
      }
    }).catch((error) => {
      console.log(error);
      if(error === "Error 400"){
      setErrorMessage("Incorrect Email or Password")
      } else {
        setErrorMessage("Unkown Error");
      }
    });
  };
    // Handle SignOut
  const signOut = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  // CARD MANAGEMENT
      //executed when card is clicked
  const handleImageClick = (link, name, weather, id, owner) => {
    const owned = owner === userData._id;
    console.log(owned);  
    openModal("item-modal", { link, name, weather, id, owner });
  };
    // Executed on add item submit
  const handleAddItemSubmit = (name, imageUrl, weather) => {
    const token = getToken();
    createItem(token, name, imageUrl, weather)
      .then((res) => {
        setClothingItems([res.item, ...clothingItems]);
        closeModal();
      })
      .catch((error) => console.error("Failed to add clothing item: ", error));
  };
    // Makes sure right card is opened when clicked.
  const openConfirmationModal = (id) => {
    setDeleteCard(id);
    setActiveModal("delete-modal");
  };
    // Deletes Card
  const handleItemDelete = () => {
    const token = getToken()
    deleteItem(deleteCard, token).then(() => {
      const updatedItems = clothingItems.filter((item) => item._id !== deleteCard);
      setClothingItems(updatedItems);
      setDeleteCard({});
      closeModal()
    }).catch((error) =>
      console.error("Failed to delete card:", error)
    );
  };

  // PROFILE EDIT
  const onSubmitEdit = ({name, avatar}) => {
    const token = getToken();
    editProfile(token, name, avatar).then((res) => {
      setUserData({name: name, avatar: avatar})
      updateUser(token);
      closeModal();
      
    }).catch((error) => {
      console.error(error);
    })
  }


// LIKING CARDS
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
        .then((updatedCard) => {
          const changedCard = updatedCard.data;
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
      <isLoadingContext.Provider value={infoLoading}>
        <ActiveModalContext.Provider value={{activeModal, setActiveModal, closeModal}}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <ClothingListContext.Provider value={{ clothingItems }}>
                <UserInfoContext.Provider value={userData}>
                  <isLoggedInContext.Provider value={isLoggedIn}>
                    <ErrorMessageContext.Provider value={errorMessage}>
                      <Header
                        location={climate.location}
                        garmentModal={() => openModal("add-garment")}
                        loginModal={() => openModal("login-modal")}
                        registerModal={() => openModal("register-modal")}
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
                    </ErrorMessageContext.Provider>
                  </isLoggedInContext.Provider>
                </UserInfoContext.Provider>

            </ClothingListContext.Provider>
          </CurrentTemperatureUnitContext.Provider>
        </ActiveModalContext.Provider>
        </isLoadingContext.Provider>
    </div>
  );
}

export default App;
