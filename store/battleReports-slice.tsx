import { createSlice } from "@reduxjs/toolkit";

const battleReportsInitialState = {
  unreadBattleReports: 0,
  battleReports: [],
};

const battleReportsSlice = createSlice({
  name: "battleReports",
  initialState: () => battleReportsInitialState,
  reducers: {
    setBattleReports(state, action) {
      state.unreadBattleReports =
        state.unreadBattleReports + action.payload.unreadBattleReports;
      state.battleReports = action.payload.battleReports;
    },
  },
});

export const battleReportsActions = battleReportsSlice.actions;

export default battleReportsSlice;
