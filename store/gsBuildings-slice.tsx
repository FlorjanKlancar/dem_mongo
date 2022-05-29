import {createSlice} from "@reduxjs/toolkit";

const gsBuildingsInitialState = {
  gsBuildings: {},
};

const gsBuildingsSlice = createSlice({
  name: "gsBuildings",
  initialState: () => gsBuildingsInitialState,
  reducers: {
    initializeGsBuildings(state, action) {
      state.gsBuildings = action.payload.gsBuildings;
    },
  },
});

export const gsBuildingsActions = gsBuildingsSlice.actions;

export default gsBuildingsSlice;
