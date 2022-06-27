import { createSlice } from "@reduxjs/toolkit";

const heroInitialState = {
  hero: {},
};

const heroSlice = createSlice({
  name: "hero",
  initialState: () => heroInitialState,
  reducers: {
    setHero(state, action) {
      state.hero = action.payload;
    },
  },
});

export const heroActions = heroSlice.actions;

export default heroSlice;
