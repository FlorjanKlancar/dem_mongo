import { createSlice } from "@reduxjs/toolkit";

const loadingInitialState = {
  loading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: () => loadingInitialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice;
