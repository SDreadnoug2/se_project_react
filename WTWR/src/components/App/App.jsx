import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
