import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Modal } from './ModalWindow';

export default function ModalButtonWithPortal() {
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

  return ReactDOM.createPortal(
    <div>
      <button onClick={handleButtonClick}>Open Modal</button>
      {showModal && <Modal content={modalContent} onClose={handleModalClose} />}
    </div>,
    document.body
  );
};

