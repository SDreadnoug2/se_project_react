import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header(props) {
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
        <button
          onClick={props.garmentModal}
          type="button"
          className="header__button"
        >
          +Add Clothes
        </button>
        <h3 className="header__text header__name">{name}</h3>
        <button type="button" onClick={props.loginModal} className="header__text header__name">Login</button>
        <button type="button" onClick={props.registerModal} className="header__text header__name">Sign Up</button>
        <Link to="/profile">
          <img
            className="header__profile"
            src="./src/assets/tempPP.jpg"
            alt="profile picture"
          ></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
