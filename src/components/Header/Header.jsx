import "./Header.css";
import React, {useContext} from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { UserInfoContext } from "../../contexts/UserInfoContext";
import Avatar from "../Avatar/Avatar";

function Header(props) {
  const userData = useContext(UserInfoContext);
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
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
          <h3 className="header__text header__name">{userData.name}</h3>
            <Link to="/profile">
              <Avatar user={userData}/>
              {/*<img
                className="header__profile"
                src= {`${userData.avatar}`}
                alt="profile picture"
              ></img>*/}
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
