export interface buildingModel {
  description: string;
  image: string;
  levels: any;
  name: string;
  type: string;
  isBuilding: boolean;
  group: string;
}

export interface currentlyBuildingModel {
  buildingId: string;
  currentlyBuildingLevel: number;
  fieldId: number;
  endBuildTime: Date;
  isBuilding: boolean;
}
