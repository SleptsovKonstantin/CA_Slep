import React, { FC } from "react";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import List from "./components/List";
import Modal from "./components/Modal";

const App: FC = () => {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Income />
      <Expenses />
      <List />
      <Modal />
    </div>
  );
};

export default App;
