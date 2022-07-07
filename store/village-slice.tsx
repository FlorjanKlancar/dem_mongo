import { createSlice } from "@reduxjs/toolkit";

const villageInitialSlice = {
  clayProductionPerH: 0,
  currentlyBuilding: [],
  id: "",
  ironProductionPerH: 0,
  population: 0,
  resourceFields: [],
  resourcesStorage: {
    woodAmount: 0,
    clayAmount: 0,
    ironAmount: 0,
    wheatAmount: 0,
  },
  unitTrainQueue: [],
  units: [],
  villageBuildings: [],
  wheatProductionPerH: 0,
  woodProductionPerH: 0,
  createdAt: 0,
  updatedAt: 0,
};

const villageSlice = createSlice({
  name: "village",
  initialState: () => villageInitialSlice,
  reducers: {
    setVillage(state, action) {
      state.id = action.payload.id;
      state.population = action.payload.population;

      state.resourceFields = action.payload.resourceFields;
      state.resourcesStorage = {
        woodAmount: action.payload.resourcesStorage.woodAmount,
        clayAmount: action.payload.resourcesStorage.clayAmount,
        ironAmount: action.payload.resourcesStorage.ironAmount,
        wheatAmount: action.payload.resourcesStorage.wheatAmount,
      };
      state.villageBuildings = action.payload.villageBuildings;

      state.woodProductionPerH = action.payload.woodProductionPerH;
      state.clayProductionPerH = action.payload.clayProductionPerH;
      state.ironProductionPerH = action.payload.ironProductionPerH;
      state.wheatProductionPerH = action.payload.wheatProductionPerH;

      state.currentlyBuilding = action.payload.currentlyBuilding;

      state.units = action.payload.units;
      state.unitTrainQueue = action.payload.unitTrainQueue;

      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    removeVillage(state) {
      state.id = "";
      state.population = 0;

      state.resourceFields = [];
      state.resourcesStorage = {
        woodAmount: 0,
        clayAmount: 0,
        ironAmount: 0,
        wheatAmount: 0,
      };
      state.villageBuildings = [];

      state.woodProductionPerH = 0;
      state.clayProductionPerH = 0;
      state.ironProductionPerH = 0;
      state.wheatProductionPerH = 0;
      state.currentlyBuilding = [];

      state.units = [];
      state.unitTrainQueue = [];

      state.createdAt = 0;
      state.updatedAt = 0;
    },

    addBuildingNow(state, action) {
      state.currentlyBuilding = action.payload.currentlyBuilding;
      state.resourcesStorage = action.payload.resourcesStorage;
    },

    cancleBuilding(state) {
      state.currentlyBuilding = [];
    },

    updateResourcesInRealTime(state, action) {
      state.resourcesStorage = action.payload;
    },

    addBuildUnitsNow(state, action) {
      state.unitTrainQueue = action.payload.unitTrainQueue;
      state.resourcesStorage = action.payload.resourcesStorage;
    },

    addUnitsToQueue(state, action) {
      state.units = action.payload;
    },
  },
});

export const villageActions = villageSlice.actions;

export default villageSlice;
