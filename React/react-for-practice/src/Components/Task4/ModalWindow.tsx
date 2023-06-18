import React from "react";
import './style.css'

type ModalProps = {
  content: JSX.Element;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {content}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};