import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "../Slider/slider-reducer";

const store = configureStore({
  reducer: {
    slider: sliderReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


