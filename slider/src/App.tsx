import React, { useEffect, useState } from "react";

import { getData } from "./helpers/help";
import { apiWithImage } from "./constants/constant";

import Slider from "./Slider/slider-components";
import SliderUniversal from "./Slider-universal/slider-universal";

import "./App.css";

const App: React.FC = () => {
  const [dataImages, setDataImages] = useState([]);

  useEffect(() => {
    getData(apiWithImage)
      .then((data) => setDataImages(prev => prev = data))
      .catch((data) => console.log(data));
  }, []);
  
  return (
    <div className="App">
      <Slider />
      <SliderUniversal dataImage={dataImages} />
    </div>
  );
};

export default App;
