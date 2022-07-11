import {createSlice} from "@reduxjs/toolkit";

const battleReportsInitialState = {
  battleReports: 0,
};

const battleReportsSlice = createSlice({
  name: "battleReports",
  initialState: () => battleReportsInitialState,
  reducers: {
    setBattleReports(state, action) {
      state.battleReports = state.battleReports + action.payload;
    },
  },
});

export const battleReportsActions = battleReportsSlice.actions;

export default battleReportsSlice;
