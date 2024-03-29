import { currentlyBuildingModel } from "./buildingModel";
import { resourceStorage } from "./resourceStorage";
import { unitModel } from "./unitModel";

export interface villageModel {
  clayProductionPerH: number;
  createdAt: Date;
  currentlyBuilding: currentlyBuildingModel[];
  elo: number;
  ironProductionPerH: number;
  population: number;
  resourceFields: [];
  resourcesStorage: resourceStorage;
  unitTrainQueue: [];
  units: unitModel[];
  updatedAt: Date;
  userId: string;
  villageBuildings: [];
  wheatProductionPerH: number;
  woodProductionPerH: number;
  _id: string;
}
