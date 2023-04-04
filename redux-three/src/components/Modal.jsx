import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/store";
import "./modal-style.css";

const Modal = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);
  const loadingText = useSelector((state) => state.loaderText);

  if (!isLoading) {
    return null;
  }
  if (!loadingText) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="loader">
            <div className="spinner"></div>
            <p>Запрос выполняется..</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader">
          <div className="spinner"></div>
          <p>{loadingText}</p>
          <button onClick={() => dispatch(closeModal())}>ok</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
