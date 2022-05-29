import {createSlice} from "@reduxjs/toolkit";

const gsUnitsInitialState = {
  gsUnits: {},
};

const gsUnitsSlice = createSlice({
  name: "gsUnits",
  initialState: () => gsUnitsInitialState,
  reducers: {
    initializeGsUnits(state, action) {
      state.gsUnits = action.payload.gsUnits;
    },
  },
});

export const gsUnitsActions = gsUnitsSlice.actions;

export default gsUnitsSlice;
