import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Header />
        <Main />
        <ModalWithForm />
        <Footer />
      </div>
    </>
  );
}

export default App;
