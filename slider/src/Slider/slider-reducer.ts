import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentIndex: 0,
  images: [
    {
      id: 1,
      url: "https://via.placeholder.com/600/92c952",
      text: "Шедевр нереальный",
    },
    {
      id: 2,
      url: "https://via.placeholder.com/600/771796",
      text: "Восхищение. Овации",
    },
    {
      id: 3,
      url: "https://via.placeholder.com/600/24f355",
      text: "Малевич отдыхает",
    },
  ],
  isPags: true,
  isNavs: true,
  isLoop: false
};

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    goToNext: (state) => {
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
    },
    goToPrev: (state) => {
      state.currentIndex = (state.currentIndex - 1) % state.images.length;
      if(state.currentIndex === -1 ) {
        state.currentIndex = state.images.length -1 
      }
    },
    setCurrentPage: (state, action) => {
      state.currentIndex = action.payload;
    },
    setPagsVisible: (state) => {
      state.isPags = !state.isPags;
    },
    setNavsVisible: (state) => {
      state.isNavs = !state.isNavs;
    },
    setIsLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
  },
});

export const {
  goToNext,
  goToPrev,
  setCurrentPage,
  setPagsVisible,
  setNavsVisible,
  setIsLoop
} = sliderSlice.actions;
export default sliderSlice.reducer;
