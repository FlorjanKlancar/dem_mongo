import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  displayName: "",
  email: "",
  expiresIn: "",
  idToken: "",
  kind: "",
  localId: "",
  refreshToken: "",
  registered: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: () => authInitialState,
  reducers: {
    logIn(state, action) {
      state.idToken = action.payload.idToken;
      state.email = action.payload.email;
      state.expiresIn = action.payload.expiresIn;
      state.displayName = action.payload.displayName;
      state.kind = action.payload.idTkindoken;
      state.localId = action.payload.localId;
      state.refreshToken = action.payload.refreshToken;
      state.registered = action.payload.registered;
      sessionStorage.setItem("Token", action.payload.idToken);
    },
    logOut(state) {
      state.idToken = "";
      state.idToken = "";
      state.email = "";
      state.expiresIn = "";
      state.displayName = "";
      state.kind = "";
      state.localId = "";
      state.refreshToken = "";
      state.registered = false;
      sessionStorage.removeItem("Token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
