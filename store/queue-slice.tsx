import {createSlice} from "@reduxjs/toolkit";

const queueInitialState = {
  userInQueue: false,
  timeInQueue: 0,
  selectedSquad: [],
};

const queueSlice = createSlice({
  name: "queue",
  initialState: () => queueInitialState,
  reducers: {
    setUserInQueue(state, action) {
      state.userInQueue = action.payload;
    },
    setTimeInQueue(state) {
      state.timeInQueue = state.timeInQueue + 1;
    },
    setSelectedSquad(state, action) {
      state.selectedSquad = action.payload;
    },
  },
});

export const queueActions = queueSlice.actions;

export default queueSlice;
