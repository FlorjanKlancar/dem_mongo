import mongoose from "mongoose";
const {Schema} = mongoose;

const VillageSchema = new mongoose.Schema(
  {
    id: {type: String},
    woodProductionPerH: {type: Number},
    clayProductionPerH: {type: Number},
    ironProductionPerH: {type: Number},
    wheatProductionPerH: {type: Number},

    population: {type: Number},

    currentlyBuilding: [],
    unitTrainQueue: [],

    resourcesStorage: {
      woodAmount: {type: Number},
      clayAmount: {type: Number},
      ironAmount: {type: Number},
      wheatAmount: {type: Number},
    },
    resourceFields: [
      {
        gridPosition: {type: Number},
        description: {type: String},
        level: {type: Number},
        imageGrid: {type: String},
        id: {type: Number},
        type: {type: String},
      },
    ],
    villageBuildings: [
      {
        id: {type: Number},
        gridPosition: {type: Number},
        imageGrid: {type: String},
        type: {type: String},
        level: {type: Number},
        description: {type: String},
      },
    ],

    units: [
      {
        level: {type: Number},
        amount: {type: Number},
        name: {type: String},
      },
    ],
    elo: {type: Number},
    userId: {type: Schema.Types.ObjectId, ref: "User"},
  },
  {timestamps: true}
);

// prettier-ignore
export default mongoose?.models?.Village || mongoose.model("Village", VillageSchema);
