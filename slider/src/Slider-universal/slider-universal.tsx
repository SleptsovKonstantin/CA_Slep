import React, { memo, useCallback, useEffect, useState } from "react";

import { IImagesData } from "../types/type";

import "./slider.style.css";

const SliderUniversal: React.FC<any> = ({ dataImage }) => {
  const [imageArr, setImageArr] = useState<IImagesData[] | []>([]);
  const [currentIndex, setСurrentIndex] = useState(0);
  const [isPagsVisible, setIsPagsVisible] = useState<boolean>(true);
  const [isNavsVisible, setIsNavsVisible] = useState<boolean>(true);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isDelayMs, setIsDelayMs] = useState<number>(0);

  const handleNext = () => {
    if (currentIndex !== imageArr.length - 1 || isLooping) {
      setСurrentIndex((prev) => (prev = (prev + 1) % imageArr.length));
    }
  };

  const handlePrev = () => {
    if (currentIndex !== 0 || isLooping) {
      setСurrentIndex((prev) => {
        prev = (prev - 1) % imageArr.length;
        if (prev === -1) {
          prev = imageArr.length - 1;
        }
        return prev;
      });
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setСurrentIndex((prev) => (prev = pageNumber));
  };

  const handlePagsVisible = () => {
    setIsPagsVisible((prev) => (prev = !prev));
  };

  const handleNavsVisible = () => {
    setIsNavsVisible((prev) => (prev = !prev));
  };

  const handleDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDelayMs((prev) => (prev = Number(e.target.value)));
  };

  const autoPlay = useCallback(() => {
    if (isAutoPlay) {
      setСurrentIndex((prev) => (prev = (prev + 1) % imageArr.length));
    }
  }, [imageArr.length, isAutoPlay]);

  const renderPagination = () => {
    if (!isPagsVisible) return null;
    const paginationItems = [];
    for (let i = 0; i < imageArr.length; i++) {
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
    setImageArr((prev) => (prev = dataImage));

    let ms = isDelayMs;

    if (isDelayMs === 0) {
      ms = 5000;
    }

    const intervalFn = setInterval(autoPlay, ms);

    return () => clearInterval(intervalFn);
  }, [autoPlay, isDelayMs, dataImage]);

  const handleLooping = () => {
    setIsLooping((prev) => (prev = !prev));
  };
  if (imageArr.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="slider">
      <h1>Slider without Redux</h1>
      <div className="slider-div1">
        {isNavsVisible && <button onClick={handlePrev}>Назад</button>}
        <img
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          src={imageArr[currentIndex].url}
          alt="slider"
        />
        {isNavsVisible && <button onClick={handleNext}>Далее</button>}
      </div>
      <div className="slider-div2">
        <span>"{imageArr[currentIndex].text}"</span>
        <span>
          {currentIndex + 1}/{imageArr.length}
        </span>
        {renderPagination()}
      </div>

      <div className="slider-options">
        <label>
          Loop
          <input type="checkbox" checked={isLooping} onChange={handleLooping} />
        </label>
        <label>
          Show pagination
          <input
            type="checkbox"
            checked={isPagsVisible}
            onChange={handlePagsVisible}
          />
        </label>
        <label>
          Show navination
          <input
            type="checkbox"
            checked={isNavsVisible}
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

export default memo(SliderUniversal);
