import { createSlice } from "@reduxjs/toolkit";

const queueInitialState = {
  userInQueue: false,
  timeInQueue: 0,
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
  },
});

export const queueActions = queueSlice.actions;

export default queueSlice;
