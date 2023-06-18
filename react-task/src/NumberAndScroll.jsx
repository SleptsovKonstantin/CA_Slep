// 15 Есть реализация компонента, от которого требуется 2 вещи:

// 1) выводить текущее значение вертикального скролла окна (window.scrollY)
// 2) после монтирования асинхронно получить число и вывести его

// Нужно найти, объяснить и исправить как можно больше проблем в реализации

import React, { useState, useEffect } from "react";

// имитация запроса к серверу. просто получаем число асинхронно

export const fetchRandomNumber = () => Promise.resolve(Math.random());

export const NumberAndScroll = ({ asyncFunction }) => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState();

  useEffect(() => {
    asyncFunction().then((res) => setNumber(res));
  }, [asyncFunction]);

  const handleScroll = () => {
    setScroll(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div style={{ position: "fixed", backgroundColor: "#cccc", width: "100%" }}>
      <h1>Number And Scroll component</h1>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};
