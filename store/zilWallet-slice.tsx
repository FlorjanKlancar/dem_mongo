import { createSlice } from "@reduxjs/toolkit";

const zilWalletInitialState = {
  zilWallet: {},
};

const zilWalletSlice = createSlice({
  name: "zilWallet",
  initialState: () => zilWalletInitialState,
  reducers: {
    setWallet(state, action) {
      state.zilWallet = action.payload;
    },
    removeWallet(state) {
      state.zilWallet = {};
    },
  },
});

export const zilWalletActions = zilWalletSlice.actions;

export default zilWalletSlice;
