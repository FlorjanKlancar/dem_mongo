import { configureStore } from "@reduxjs/toolkit";
import gsBuildingsSlice from "./gsBuildings-slice";
import gsUnitsSlice from "./gsUnits-slice";
import villageSlice from "./village-slice";
import loadingSlice from "./loading-slice";
import zilWalletSlice from "./zilWallet-slice";

const store = configureStore({
  reducer: {
    village: villageSlice.reducer,
    gsUnits: gsUnitsSlice.reducer,
    gsBuildings: gsBuildingsSlice.reducer,
    loading: loadingSlice.reducer,
    zilWallet: zilWalletSlice.reducer,
  },
});

export default store;
