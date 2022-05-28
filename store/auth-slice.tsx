import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  idToken: "",
  localId: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: () => authInitialState,
  reducers: {
    logIn(state, action) {
      state.idToken = action.payload.token;
      state.localId = action.payload.localId;
      localStorage.setItem("token", action.payload.token);
    },
    logOut(state) {
      state.idToken = "";
      state.localId = "";
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
