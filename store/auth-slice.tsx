import {createSlice} from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: () => authInitialState,
  reducers: {
    logIn(state, action) {
      state.token = action.payload.token;
      sessionStorage.setItem("Token", action.payload.token);
    },
    logOut(state) {
      state.token = "";
      sessionStorage.removeItem("Token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
