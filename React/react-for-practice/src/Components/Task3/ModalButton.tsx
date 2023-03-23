import React, { useState } from "react";
import { Modal } from "./ModalWindow";

const ModalButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const modalContent = (
    <div>
      <h1>Hello, World!</h1>
      <p>This is an example modal content.</p>
    </div>
  );

  return (
    <div
      style={{
        width: "30vw",
        height: "30vh",
        background: "azure",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={handleButtonClick}>Open Modal</button>
      {showModal && <Modal content={modalContent} onClose={handleModalClose} />}
    </div>
  );
};

export default ModalButton;
