import React, { useCallback, useEffect, useState } from "react";
import {
  goToNext,
  goToPrev,
  setCurrentPage,
  setPagsVisible,
  setNavsVisible,
  setIsLoop,
} from "./slider-reducer";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelectorAndDispatch";

import "./slider.style.css";

const Slider = () => {
  const dispatch = useAppDispatch();
  const { currentIndex, images, isPags, isNavs, isLoop } = useAppSelector(
    (state: any) => state.slider
  );

  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isDelayMs, setIsDelayMs] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex !== images.length - 1 || isLoop) {
      dispatch(goToNext());
    }
  };

  const handlePrev = () => {
    if (currentIndex !== 0 || isLoop) {
      dispatch(goToPrev());
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handlePagsVisible = () => {
    dispatch(setPagsVisible());
  };

  const handleNavsVisible = () => {
    dispatch(setNavsVisible());
  };

  const handleDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDelayMs(Number(e.target.value));
  };

  const autoPlay = useCallback(() => {
    if (isAutoPlay) {
      dispatch(setCurrentPage((currentIndex + 1) % images.length));
    }
  }, [currentIndex, dispatch, images.length, isAutoPlay]);

  const renderPagination = () => {
    if (!isPags) return null;
    const paginationItems = [];
    for (let i = 0; i < images.length; i++) {
      paginationItems.push(
        <li
          key={i}
          className={i === currentIndex ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </li>
      );
    }
    return <ul className="pagination">{paginationItems}</ul>;
  };

  useEffect(() => {
    let ms = isDelayMs;

    if (isDelayMs === 0) {
      ms = 5000;
    }

    const intervalFn = setInterval(autoPlay, ms);

    return () => clearInterval(intervalFn);
  }, [autoPlay, isDelayMs]);

  const handleLooping = () => {
    dispatch(setIsLoop());
  };

  return (
    <div className="slider">
      <h1>Slider with Redux</h1>
      <div className="slider-div1">
        {isNavs && <button onClick={handlePrev}>Назад</button>}
        <img
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          src={images[currentIndex].url}
          alt="slider"
        />
        {isNavs && <button onClick={handleNext}>Далее</button>}
      </div>
      <div className="slider-div2">
        <span>"{images[currentIndex].text}"</span>
        <span>
          {currentIndex + 1}/{images.length}
        </span>
        {renderPagination()}
      </div>

      <div className="slider-options">
        <label>
          Loop
          <input type="checkbox" checked={isLoop} onChange={handleLooping} />
        </label>
        <label>
          Show pagination
          <input
            type="checkbox"
            checked={isPags}
            onChange={handlePagsVisible}
          />
        </label>
        <label>
          Show navination
          <input
            type="checkbox"
            checked={isNavs}
            onChange={handleNavsVisible}
          />
        </label>
        <label>
          Auto play:
          <input
            className="autoInput"
            type="number"
            min="1000"
            step="1000"
            placeholder="delay in ms"
            value={isDelayMs}
            onChange={handleDelay}
          />
        </label>
      </div>
    </div>
  );
};

export default Slider;
