export interface unitModel {
  _id?: string;
  amount: number;
  level: number;
  name: string;
  attack?: number;
  costClay?: number;
  costIron?: number;
  costWheat?: number;
  costWood?: number;
  createdAt?: Date;
  defense?: number;
  timeToBuild?: number;
  type?: string;
  unitBuilding?: string;
  unitIcon?: string;
  updatedAt?: Date;
  upkeep?: number;
}
