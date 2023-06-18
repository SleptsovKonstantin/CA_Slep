import React, { FC } from "react";
import { closeModal } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectorAndDispatch";

import "./modal-style.css";

const Modal: FC  = () => {
  const dispatch = useAppDispatch();
  const isLoading: boolean = useAppSelector((state) => state.loading);
  const loadingText: string = useAppSelector((state) => state.loaderText);

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
