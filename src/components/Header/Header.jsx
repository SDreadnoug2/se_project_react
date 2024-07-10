import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

function Header(props) {

  const navigate = useNavigate();
  function signOut() {
    removeToken();
    navigate("/");
    props.setIsLoggedIn(false);
  }
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const addButton = undefined;
  const name = "bill";
  const profilePicture = "";
  return (
    <header className="header">
      <div className="header__divide">
        <Link to="/">
          <img
            className="header__logo"
            src="./src/assets/Logo.png"
            alt="wtwr logo"
          />
        </Link>
        <h3 className="header__text">
          {currentDate}, {props.location}
        </h3>
      </div>
      <div className="header__divide">
        <ToggleSwitch /> 
        {props.isLoggedIn && (
          <>
            <button
            onClick={props.garmentModal}
            type="button"
            className="header__button"
          >
            +Add Clothes
          </button>
          <h3 className="header__text header__name">{props.userData.name}</h3>
            <Link to="/profile">
            <img
              className="header__profile"
              src= {`${props.userData.avatar}`}
              alt="profile picture"
            ></img>
            <button type="button" onClick={signOut} className="header__text header__name">Sign Out</button>
          </Link>
        </>
        )}
        {!props.isLoggedIn && (
          <>
            <button type="button" onClick={props.loginModal} className="header__text header__name">Login</button>
            <button type="button" onClick={props.registerModal} className="header__text header__name">Sign Up</button>
          </>                 
        )}
      </div>
    </header>
  );
}

export default Header;
