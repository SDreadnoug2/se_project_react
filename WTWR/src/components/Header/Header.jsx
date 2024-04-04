import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const location = undefined;
  const addButton = undefined;
  const name = "bill";
  const profilePicture = "";

  return (
    <div className="header">
      <div className="header__divide">
        <img
          className="header__logo"
          src="../src/assets/Logo.png"
          alt="wtwr logo"
        />
        <h3 className="header__text">{currentDate}, New York</h3>
      </div>
      <div className="header__divide">
        <button type="button" className="header__button">
          +Add Clothes
        </button>
        <h3 className="header__text header__name">{name}</h3>
        <img
          className="header__profile"
          src="../src/assets/tempPP.jpg"
          alt="profile picture"
        ></img>
      </div>
    </div>
  );
}

export default Header;
