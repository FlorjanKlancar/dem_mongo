import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import gsBuildingsSlice from "./gsBuildings-slice";
import gsUnitsSlice from "./gsUnits-slice";
import villageSlice from "./village-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    village: villageSlice.reducer,
    gsUnits: gsUnitsSlice.reducer,
    gsBuildings: gsBuildingsSlice.reducer,
  },
});

export default store;
