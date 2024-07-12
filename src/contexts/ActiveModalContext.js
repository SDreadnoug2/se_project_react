import React from "react";

const ActiveModalContext = React.createContext({
  activeModal: null,
  setActiveModal: () => {},
  closeModal: () => {},
});

export { ActiveModalContext };
