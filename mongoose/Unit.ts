import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema(
  {
    id: {type: String},
    unitName: {type: String},
    costWood: {type: Number},
    costClay: {type: Number},
    costIron: {type: Number},
    costWheat: {type: Number},
    timeToBuild: {type: Number},
    attack: {type: Number},
    defense: {type: Number},
    type: {type: String},
    upkeep: {type: Number},
    unitIcon: {type: String},
    unitBuilding: {type: String},
  },
  {timestamps: true}
);

export default mongoose.model("Unit", UnitSchema);
